import { Coffee, SettingsIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/FormFields';
import { useUpdateSetting } from '../settings/useUpdateSetting';
import TrailingLabel from '../../ui/TrailingLabel';

const inputStyle =
  'w-full disabled:opacity-50 px-5 disabled:cursor-not-allowed rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-16 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

function SettingForm({ settings }) {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { updateSetting, isPending: isUpdating } = useUpdateSetting();

  useEffect(() => {
    if (settings) {
      reset({
        breakfastPrice: settings.breakfastPrice,
        minBookingLength: settings.minBookingLength,
        maxBookingLength: settings.maxBookingLength,
        maxGuestsPerBooking: settings.maxGuestsPerBooking,
      });
    }
  }, [settings, reset]);

  function onSubmit(data) {
    updateSetting({ id: settings.id, newSetting: data });
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto pb-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <form onBlur={handleSubmit(onSubmit)} className="space-y-5">
          {/* Booking Configuration */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
              <div className="rounded-lg bg-indigo-50 p-2.5">
                <SettingsIcon size={20} className="text-indigo-600" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Booking Configuration
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Manage your booking rules and guest limits.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              {/* Minimum Booking */}
              <Form
                label="Minimum Booking Length"
                error={
                  errors?.minBookingLength && errors.minBookingLength.message
                }
              >
                <div className="relative">
                  <input
                    disabled={isUpdating}
                    type="number"
                    {...register('minBookingLength', {
                      valueAsNumber: true,
                      required: 'Min booking length is required',
                      validate: (value) =>
                        value < getValues('maxBookingLength') ||
                        'Min booking length should be lesser than Max booking length',
                    })}
                    className={inputStyle}
                  />
                  <TrailingLabel>Nights</TrailingLabel>
                </div>
              </Form>

              {/* Maximum Booking */}
              <Form
                label="Maximum Booking Length"
                error={
                  errors?.maxBookingLength && errors.maxBookingLength.message
                }
              >
                <div className="relative">
                  <input
                    type="number"
                    {...register('maxBookingLength', {
                      valueAsNumber: true,
                      required: 'Max booking length is required',
                      validate: (value) =>
                        value > getValues('minBookingLength') ||
                        'Max booking length must be greater than Min booking length',
                    })}
                    className={inputStyle}
                  />
                  <TrailingLabel>Nights</TrailingLabel>
                </div>
              </Form>

              {/* Maximum Guests */}
              <Form
                label="Maximum Guests Per Booking"
                error={
                  errors?.maxGuestsPerBooking &&
                  errors.maxGuestsPerBooking.message
                }
              >
                <div className="relative">
                  <input
                    type="number"
                    {...register('maxGuestsPerBooking', {
                      valueAsNumber: true,
                      required: 'Max guests per booking is required',
                      validate: (value) =>
                        value > 0 || 'Maximum guests must be greater than 0',
                    })}
                    className={inputStyle}
                  />
                  <TrailingLabel>Guests</TrailingLabel>
                </div>
              </Form>
            </div>
          </section>

          {/* Breakfast Pricing */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
              <div className="rounded-lg bg-emerald-50 p-2.5">
                <Coffee size={20} className="text-emerald-600" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  Breakfast Pricing
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Configure additional breakfast charges.
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="max-w-md">
                <Form
                  label="Breakfast Price"
                  error={
                    errors?.breakfastPrice && errors.breakfastPrice.message
                  }
                >
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      {...register('breakfastPrice', {
                        valueAsNumber: true,
                        required: 'Breakfast price is required',
                      })}
                      className={inputStyle}
                    />
                  </div>
                </Form>
                <p className="mt-2 text-xs text-gray-400">
                  Price per guest for breakfast.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex justify-end border-t border-gray-200 pt-5">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingForm;
