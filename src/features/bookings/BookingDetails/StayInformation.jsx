import {
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Coffee,
  Users,
} from 'lucide-react';
import { formatDate } from '../../../utils/helpers';
import Info from '../../../ui/Info';

function StayInformation({
  props: [
    startDate,
    endDate,
    image,
    description,
    maxCapacity,
    cabinId,
    hasBreakfast,
  ],
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-5 font-semibold text-gray-800">Stay Information</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarCheck size={17} />
            Check-in
          </div>

          <p className="mt-2 font-semibold text-gray-800">
            {formatDate(startDate)}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={17} />
            Check-out
          </div>

          <p className="mt-2 font-semibold text-gray-800">
            {formatDate(endDate)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-5">
        <img
          src={image}
          alt={name}
          className="h-20 w-24 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Info icon={BedDouble} label="Cabin ID" value={cabinId} />

        <Info
          icon={Users}
          label="Maximum Capacity"
          value={`${maxCapacity} Guests`}
        />

        <Info
          icon={Coffee}
          label="Breakfast"
          value={hasBreakfast ? 'Included' : 'Not Included'}
        />
      </div>
    </section>
  );
}

export default StayInformation;
