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



export async function updateCurrentUser({ fullName, password, avatar }) {
  
  const updateData = {};

  if (password) updateData.password = password;

  if (fullName) {
    updateData.data = { fullName };
  }

  let data;

  // Update authentication data only when needed
  if (Object.keys(updateData).length > 0) {
    const { data: userData, error } =
      await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);

    data = userData;
  }

  // Update avatar if provided
  if (avatar) {
    const fileName = `${Date.now()}-${avatar.name}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    const imageUrl = `https://hovamjuoqexoukogzrtt.supabase.co/storage/v1/object/public/avatars/${fileName}`;

    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: {
        fullName,
        avatar: imageUrl,
      },
    });

    if (error) throw new Error(error.message);

    data = updatedUser;
  }

  return data;
}
