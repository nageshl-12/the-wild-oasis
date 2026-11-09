import Info from '../../../ui/Info';
import { Mail, Globe, IdCard, Users } from 'lucide-react';

function GuestInformation({
  props: [fullName, email, nationalID, countryFlag, numGuests, nationality],
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-5 font-semibold text-gray-800">Guest Information</h2>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">
          {fullName.slice(0, 2).toUpperCase()}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{fullName}</h3>
          <p className="text-sm text-gray-500">Primary Guest</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Info icon={Mail} label="Email" value={email} />

        <Info
          icon={Globe}
          label="Nationality"
          value={nationality}
          image={countryFlag}
        />

        <Info icon={IdCard} label="National ID" value={nationalID} />

        <Info icon={Users} label="Guest Count" value={`${numGuests} Guests`} />
      </div>
    </section>
  );
}

export default GuestInformation;
