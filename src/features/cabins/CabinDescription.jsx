import { CalendarDays, Users, X } from 'lucide-react';
import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';

function CabinDescription({ setShowDescription }) {
  const { cabins, isPending } = useCabins();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  const cabinId = Number(searchParams.get('descCabin'));

  const cabin = cabins.find((cabin) => cabin.id === cabinId);

  if (!cabin) return null;

  const { name, description, maxCapacity } = cabin;

  function handleCloseDescription() {
    setShowDescription(false);

    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.delete('descCabin');
      return newParams;
    });
  }

  return (
    <Modal onClose={handleCloseDescription}>
      <div className="rounded-xl max-w-160 border border-gray-800 bg-gray-950 p-5 text-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-100">About this cabin</h3>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
              Active
            </span>

            <button
              onClick={handleCloseDescription}
              className="rounded-lg p-1.5 text-gray-400 transition cursor-pointer hover:bg-gray-800 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Cabin overview
          </p>

          <h2 className="mt-2 text-xl font-semibold">Cabin {name}</h2>

          <p className="mt-2 text-sm leading-6 text-gray-400 max-h-50 md:max-h-auto overflow-y-auto">
            {description}
          </p>
        </div>

        <div className="my-5 border-t border-gray-800" />

        {/* Details */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Users size={17} className="text-gray-400" />

            <div>
              <p className="text-xs text-gray-400">Capacity</p>
              <p className="mt-1 text-sm font-semibold">{maxCapacity} Guests</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between text-xs text-gray-400">
          <span>Cabin information</span>

          <span className="flex items-center gap-2">
            <CalendarDays size={14} />
            Updated recently
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default CabinDescription;
