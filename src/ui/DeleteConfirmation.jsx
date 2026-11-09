import { useSearchParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { useDeleteCabin } from '../features/cabins/useDeleteCabin';
import { useDeleteBooking } from '../features/bookings/useDeleteBooking';
import Modal from './Modal';

function DeleteConfirmation({ props: { setShowDelete, field, id } }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramId = Number(searchParams.get(`delete${field}`)) || id;

  const { deleteCabin, isDeletingCabin } = useDeleteCabin();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const isDeleting = isDeletingCabin || isDeletingBooking;

  function removeDeleteParam() {
    setSearchParams(
      (params) => {
        const updatedParams = new URLSearchParams(params);

        updatedParams.delete(`delete${field}`);

        return updatedParams;
      },
      { replace: true },
    );
  }

  function handleDelete() {
    const deleteOptions = {
      onSuccess: () => {
        setShowDelete(false);
        removeDeleteParam();
      },
    };

    switch (field) {
      case 'Cabin':
        return deleteCabin(paramId, deleteOptions);

      case 'Booking':
        return deleteBooking(paramId, deleteOptions);

      default:
        return;
    }
  }

  function handleCancel() {
    setShowDelete(false);
    removeDeleteParam();
  }

  return (
    <Modal onClose={handleCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-4">
            <Trash2 size={28} className="text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Delete {field} #{paramId}?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to delete this {field}? This action cannot be
            undone and all associated data may be permanently removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={handleCancel}
            disabled={isDeleting}
            className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 size={16} />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
