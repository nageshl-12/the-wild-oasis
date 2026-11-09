import { useState } from 'react';
import Table from '../../ui/Table';
import TableHeader from '../../ui/TableHeader';
import CabinTableCard from './CabinTableDesktop';
import CabinTableMobile from './CabinTableMobile';
import DeleteConfirmation from '../../ui/DeleteConfirmation';
import CabinDescription from './CabinDescription';
function CabinTable({ cabins, showForm, setShowForm }) {
  const [showDelete, setShowDelete] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      {showDelete && (
        <DeleteConfirmation props={{ setShowDelete, field: 'Cabin' }} />
      )}
      {showDescription && (
        <CabinDescription setShowDescription={setShowDescription} />
      )}

      {/* Desktop Table */}
      <div className="hidden md:block ">
        <Table height="max-h-[76dvh]">
          <TableHeader
            fields={['Cabin', 'Capacity', 'Price', 'Discount', 'Actions']}
            widths={['30%', '18%', '18%', '18%', '16%']}
          />

          <Table.Body>
            {cabins.map((cabin) => (
              <CabinTableCard
                setShowDescription={setShowDescription}
                setShowDelete={setShowDelete}
                cabin={cabin}
                key={cabin.id}
                setShowForm={setShowForm}
                showForm={showForm}
              />
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {cabins.map((cabin) => (
          <CabinTableMobile
            setOpenMenuId={setOpenMenuId}
            showMenu={openMenuId === cabin.id}
            setShowDescription={setShowDescription}
            cabin={cabin}
            setShowDelete={setShowDelete}
            key={cabin.id}
          />
        ))}
      </div>
    </>
  );
}

export default CabinTable;
