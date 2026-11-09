import { useSearchParams } from 'react-router-dom';
import useCreateCabin from './useCreateCabin';
import useUpdateCabin from './useUpdateCabin';
import { useCabins } from './useCabins';

export default function useFormActions(
  setPreview,
  preview,
  setShowForm,
  cabinId,
  image,
  setImage,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { createCabin, isCreating } = useCreateCabin(setShowForm);
  const { updateCabin, isUpdating } = useUpdateCabin(setShowForm);

  const { cabins, isPending } = useCabins();

  const isEditingSession = Boolean(cabinId);

  const cabinData = cabins?.find((cabin) => cabin.id === Number(cabinId));

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleRemoveImage(setValue) {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview('');

    setValue('image', null, { shouldValidate: true });
  }

  function handleClose() {
    setShowForm(false);

    const params = new URLSearchParams(searchParams);
    params.delete('editCabin');

    setSearchParams(params);
  }

  function onSubmit(data) {
    const cabinFormData = {
      ...data,
      image: image || data.image?.[0],
    };

    if (isEditingSession) {
      updateCabin(
        {
          cabinId,
          updatedCabinData: cabinFormData,
        },
        {
          onSuccess: () => setShowForm(false),
        },
      );
    } else {
      createCabin(cabinFormData, { onSuccess: () => setShowForm(false) });
    }
  }

  return {
    cabinData,
    isPending,
    isEditingSession,
    handleImageChange,
    handleRemoveImage,
    handleClose,
    onSubmit,
    isCreating,
    isUpdating,
    image,
    setImage,
    preview,
    setPreview,
  };
}
