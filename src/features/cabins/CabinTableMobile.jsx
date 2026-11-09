import { EllipsisVertical, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

import CabinActionButtonContainer from './CabinActionButtonContainer';
import ActionButton from '../../ui/ActionButton';

function CabinTableMobile({
  cabin,
  setShowDelete,
  showMenu,
  setOpenMenuId,
  setShowDescription,
}) {
  const {
    name,
    id: cabinId,
    image,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin;

  return (
    <div
      onClick={() => setOpenMenuId(null)}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
    >
      <img
        src={image}
        alt={name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="truncate font-semibold text-gray-800">{name}</h3>

        <p className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={14} />
          {maxCapacity} Guests
        </p>

        <p className="text-sm font-semibold text-gray-900">
          {formatCurrency(regularPrice)}
          <span className="text-xs font-normal text-gray-400">/ night</span>
        </p>

        {discount > 0 ? (
          <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {formatCurrency(discount)}
          </span>
        ) : (
          <span className="text-xs text-gray-400">No discount</span>
        )}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex shrink-0 flex-col"
      >
        <ActionButton onClick={() => setOpenMenuId(showMenu ? null : cabinId)}>
          <EllipsisVertical size={17} />
        </ActionButton>

        {showMenu && (
          <div className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
            <CabinActionButtonContainer
              cabinName={name}
              cabin={cabin}
              cabinId={cabinId}
              setShowDelete={setShowDelete}
              setShowDescription={setShowDescription}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CabinTableMobile;
