import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select(
      'breakfastPrice,maxBookingLength,maxGuestsPerBooking,minBookingLength,id',
    );

  if (error) {
    console.log(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

export async function updateSettings(id, newSetting) {
  const { error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
    throw new Error('Settings could not be updated');
  }
}
