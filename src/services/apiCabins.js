import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

export async function getCabins({ filter, sortBy, page }) {
  let query = supabase.from('cabins').select('*', { count: 'exact' });

  if (filter !== null) {
    if (filter.value === 'no-discount') {
      query = query.eq(filter.field, 0);
    }

    if (filter.value === 'with-discount') {
      query = query.gt(filter.field, 0);
    }
  }

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return { data, count };
}

export async function createCabin(newCabin) {
  let imagePath = newCabin.image;

  // Upload only when image is a new File
  if (newCabin.image instanceof File) {
    const imageFile = newCabin.image;
    const imageName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage
      .from('cabin-images')
      .getPublicUrl(imageName);

    imagePath = data.publicUrl;
  }

  const { error } = await supabase.from('cabins').insert({
    ...newCabin,
    image: imagePath,
  });

  if (error) throw new Error('Cabin could not be created');
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)
    .select()
    .single();
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}

export async function updateCabin(cabinId, updatedCabinData) {
  const { image, ...cabinData } = updatedCabinData;

  let imagePath;

  if (image) {
    const imageName = `${Date.now()}-${image.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, image);

    if (uploadError) {
      console.log(uploadError);
      throw new Error('Image could not be uploaded');
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('cabin-images').getPublicUrl(data.path);

    imagePath = publicUrl;
  }

  const { error } = await supabase
    .from('cabins')
    .update({
      ...cabinData,
      ...(imagePath && { image: imagePath }),
    })
    .eq('id', cabinId);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be updated');
  }
}
