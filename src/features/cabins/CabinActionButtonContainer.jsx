import { useCabinActions } from './useCabinActions';
import { FileText, Pencil, Trash2, StickyNotes } from 'lucide-react';
import ActionButton from '../../ui/ActionButton';

function CabinActionButtonContainer({
  cabinId,
  cabinName,
  setShowDelete,
  setShowDescription,
  cabin,
}) {
  const { handleDelete, handleDescription, handleEdit, handleDuplicate } =
    useCabinActions(setShowDelete, setShowDescription, cabin);
  return (
    <>
      <ActionButton
        onClick={() => handleEdit(cabinId)}
        variant="edit"
        label="edit"
      >
        <Pencil size={17} color="#eab308" />
      </ActionButton>
      <ActionButton
        onClick={() => handleDelete(cabinId)}
        variant="delete"
        label="delete"
      >
        <Trash2 size={17} color="#ef4444" />
      </ActionButton>
      <ActionButton
        onClick={() => handleDescription(cabinId)}
        variant="desc"
        label="description"
      >
        <FileText size={17} color="#3b82f6" />
      </ActionButton>
      <ActionButton
        onClick={() => handleDuplicate(cabinName)}
        variant="archive"
        label="duplicate"
      >
        <StickyNotes size={17} color="gray" />
      </ActionButton>
    </>
  );
}

export default CabinActionButtonContainer;
