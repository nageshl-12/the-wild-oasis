import { useState } from 'react';
import Table from '../../ui/Table';
import TableHeader from '../../ui/TableHeader';
import BookingTableDesktop from './BookingTableDesktop';
import BookingTableMobile from './BookingTableMobile';
import CheckoutConfirmation from '../checked-in-out/CheckoutConfirmation';
import DeleteConfirmation from '../../ui/DeleteConfirmation';
function BookingTable({ bookings }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      {/* Desktop Table */}
      {showDelete && (
        <DeleteConfirmation props={{ setShowDelete, field: 'Booking' }} />
      )}
      {showCheckout && (
        <CheckoutConfirmation
          setShowCheckout={setShowCheckout}
          bookings={bookings}
        />
      )}
      <div className="hidden md:block">
        <Table height="max-h-[76dvh]">
          <TableHeader
            fields={['Cabin', 'Guest', 'Dates', 'Status', 'Amount', 'Actions']}
            widths={['12%', '20%', '20%', '19%', '16%', '13%']}
          />
          <Table.Body>
            {bookings?.map((booking) => (
              <BookingTableDesktop
                booking={booking}
                key={booking.id}
                setShowCheckout={setShowCheckout}
                setShowDelete={setShowDelete}
              />
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {bookings?.map((booking) => (
          <BookingTableMobile
            booking={booking}
            key={booking.id}
            showMenu={openMenuId === booking.id}
            setShowDelete={setShowDelete}
            setOpenMenuId={setOpenMenuId}
            setShowCheckout={setShowCheckout}
          />
        ))}
      </div>
    </>
  );
}

export default BookingTable;
