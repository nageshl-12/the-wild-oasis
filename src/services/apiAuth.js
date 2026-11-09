import supabase from './supabase';

export async function signup({ fullName, email, password, avatar }) {
  const fileName = `${Date.now()}-${avatar.name}`;
  const imageUrl = `https://hovamjuoqexoukogzrtt.supabase.co/storage/v1/object/public/avatars/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: imageUrl || '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, avatar }) {
  let data;

  if (fullName) {
    const { data: userData, error } = await supabase.auth.updateUser({
      data: { fullName },
    });

    if (error) throw new Error(error.message);

    data = userData;
  }

  if (avatar) {
    const fileName = `${Date.now()}-${avatar.name}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { data: userData, error } = await supabase.auth.updateUser({
      data: {
        ...(fullName && { fullName }),
        avatar: imageUrl,
      },
    });

    if (error) throw new Error(error.message);

    data = userData;
  }

  return data;
}
