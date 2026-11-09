import { Users } from 'lucide-react';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';

import CabinActionButtonContainer from './CabinActionButtonContainer';

function CabinTableCard({ cabin, setShowDelete, setShowDescription }) {
  const {
    name,
    id: cabinId,
    image,
    discount,
    regularPrice,
    maxCapacity,
  } = cabin;

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="h-14 w-20 rounded-lg object-cover"
          />
          <span className="font-semibold text-gray-800">{name}</span>
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={16} />
          {maxCapacity} Guests
        </div>
      </Table.Cell>

      <Table.Cell>{formatCurrency(regularPrice)}</Table.Cell>

      <Table.Cell>
        {discount > 0 ? (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            {formatCurrency(discount)}
          </span>
        ) : (
          <span className="text-gray-400 ml-5">—</span>
        )}
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center gap-2 -translate-x-2">
          <CabinActionButtonContainer
            cabin={cabin}
            cabinName={name}
            cabinId={cabinId}
            setShowDelete={setShowDelete}
            setShowDescription={setShowDescription}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default CabinTableCard;
