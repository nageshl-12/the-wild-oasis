import Heading from '../ui/Heading';
import { useCabins } from '../features/cabins/useCabins';
import Spinner from '../ui/Spinner';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import CabinTable from '../features/cabins/CabinTable';

import Button from '../ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import AddCabinForm from '../features/cabins/AddCabinForm';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../ui/Pagination';
import ResourceNotFound from '../ui/ResourceNotFound';

function Cabins() {
  const [searchParams] = useSearchParams();
  const editCabin = searchParams.get('editCabin');
  const { cabins, isPending, count } = useCabins();
  const [showForm, setShowForm] = useState(false);

  if (!cabins?.length && !isPending)
    return <ResourceNotFound resource="Cabins" />;

  return (
    <div className="flex animate-fade-in-up h-[calc(100dvh-9.625rem)]  md:h-dvh flex-col overflow-hidden bg-white px-2 relative">
      <div className="shrink-0 space-y-3 py-3">
        <Heading fieldName="Cabins" count={count} />
        <CabinTableOperations setShowForm={setShowForm} />
      </div>

      {(showForm || editCabin) && (
        <AddCabinForm setShowForm={setShowForm} cabinId={editCabin} />
      )}

      {isPending ? (
        <Spinner />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <CabinTable
            cabins={cabins}
            showForm={showForm}
            setShowForm={setShowForm}
          />
          <Pagination count={count} />
        </div>
      )}
      <span className="md:absolute md:bottom-2 md:right-6 hidden md:block">
        <Button
          handleClick={() => {
            setShowForm(!showForm);
          }}
          style="px-4 py-4 rounded-full "
        >
          <Plus size={18} />
          <span className="hidden md:block">Add New Cabin</span>
        </Button>
      </span>
    </div>
  );
}
export default Cabins;
