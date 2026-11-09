import { useEffect, useState } from 'react';
import FormLayout from '../../ui/FormLayout';
import useFormActions from './useFormActions';
import Modal from '../../ui/Modal';

function AddCabinForm({ setShowForm, cabinId }) {
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState(null);

  const formActions = useFormActions(
    setPreview,
    preview,
    setShowForm,
    cabinId,
    image,
    setImage,
  );
  const { isPending, handleClose, ...formProps } = formActions;

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (isPending) return null;

  return (
    <Modal onClose={handleClose}>
      <FormLayout {...formProps} handleClose={handleClose} />
    </Modal>
  );
}

export default AddCabinForm;
