import { useForm } from 'react-hook-form';
import Form from '../ui/FormFields';
import { ImagePlus, X, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

function FormLayout({
  cabinData,
  preview,
  handleImageChange,
  handleRemoveImage,
  image,
  setImage,
  setPreview,
  isCreating,
  isUpdating,
  isEditingSession,
  onSubmit,
  handleClose,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discount: 0,
    },
  });

  useEffect(() => {
    if (isEditingSession && cabinData) {
      reset({
        name: cabinData.name,
        maxCapacity: cabinData.maxCapacity,
        regularPrice: cabinData.regularPrice,
        discount: cabinData.discount,
        description: cabinData.description,
      });

      setPreview(cabinData.image || '');
      setImage(null);
    }
  }, [cabinData, isEditingSession, reset, setPreview, setImage]);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-h-[90dvh]  w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-5 sm:px-7">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isEditingSession ? 'Update Cabin' : 'Add New Cabin'}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {isEditingSession
              ? 'Update a cabin for your property'
              : 'Create a new cabin for your property'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <X size={21} />
        </button>
      </div>

      <div className="space-y-5 overflow-y-auto p-5 sm:p-7">
        <Form label="Cabin Name" error={errors.name?.message}>
          <FormInput
            id="name"
            type="text"
            {...register('name', {
              required: 'Cabin name is required',
            })}
          />
        </Form>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Form label="Maximum Guests" error={errors.maxCapacity?.message}>
            <FormInput
              id="maxCapacity"
              type="number"
              min="1"
              {...register('maxCapacity', {
                valueAsNumber: true,
                required: 'Maximum capacity is required',
                min: {
                  value: 1,
                  message: 'Capacity must be at least 1',
                },
              })}
            />
          </Form>

          <Form label="Regular Price" error={errors.regularPrice?.message}>
            <FormInput
              id="regularPrice"
              type="number"
              min="0"
              {...register('regularPrice', {
                valueAsNumber: true,
                required: 'Price is required',
                min: {
                  value: 0,
                  message: 'Price cannot be negative',
                },
                onChange: () => trigger('discount'),
              })}
            />
          </Form>
        </div>

        <Form label="Discount" error={errors.discount?.message}>
          <FormInput
            id="discount"
            type="number"
            min="0"
            {...register('discount', {
              valueAsNumber: true,
              validate: (value) =>
                (!Number.isNaN(value) &&
                  value >= 0 &&
                  value < Number(getValues('regularPrice'))) ||
                'Discount must be non-negative and less than regular price',
            })}
          />
        </Form>

        <Form label="Description" error={errors.description?.message}>
          <textarea
            id="description"
            rows={3}
            placeholder="Describe your cabin..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
            {...register('description', {
              required: 'Description is required',
            })}
          />
        </Form>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Cabin Image
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-6 text-center transition hover:border-gray-400 hover:bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="Cabin preview"
                className="h-36 w-full rounded-lg object-cover"
              />
            ) : (
              <>
                <ImagePlus size={30} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Click to upload image
                </span>
                <span className="text-xs text-gray-400">PNG, JPG or WEBP</span>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              {...register('image', {
                required: !isEditingSession && 'Cabin image is required',
                onChange: handleImageChange,
              })}
            />
          </label>

          {preview && (
            <div className="flex items-center justify-between">
              {image?.name && (
                <p className="truncate text-xs text-green-600">{image.name}</p>
              )}

              <button
                type="button"
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                onClick={() => handleRemoveImage(setValue)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-white p-5 sm:flex-row sm:justify-end sm:px-7">
        <button
          type="button"
          onClick={handleClose}
          className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <SubmitButton type="submit" disabled={isCreating || isUpdating}>
          {isEditingSession
            ? isUpdating
              ? 'Updating Cabin...'
              : 'Edit Cabin'
            : isCreating
              ? 'Creating Cabin...'
              : 'Create Cabin'}
        </SubmitButton>
      </div>
    </form>
  );
}

export default FormLayout;
