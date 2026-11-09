import { useSearchParams } from 'react-router-dom';
import useCreateCabin from './useCreateCabin';

export function useCabinActions(setShowDelete, setShowDescription, cabin) {
  const [, setSearchParams] = useSearchParams();

  const { createCabin, isPending } = useCreateCabin();

  const { image, regularPrice, discount, maxCapacity, description } = cabin;

  function handleDelete(cabinId) {
    setShowDelete(true);

    setSearchParams((params) => {
      params.set('deleteCabin', cabinId);
      return params;
    });
  }

  function handleEdit(cabinId) {
    setSearchParams((params) => {
      params.set('editCabin', cabinId);
      return params;
    });
  }

  function handleDescription(cabinId) {
    setShowDescription(true);

    setSearchParams((params) => {
      params.set('descCabin', cabinId);
      return params;
    });
  }

  function handleDuplicate(cabinName) {
    createCabin({
      name: `Copy of ${cabinName}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
      description,
    });
  }

  return {
    handleDescription,
    handleEdit,
    handleDelete,
    handleDuplicate,
    isPending,
  };
}
