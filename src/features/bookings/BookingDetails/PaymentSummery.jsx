import { CheckCircle2, CircleAlert } from 'lucide-react';
import PriceRow from './PriceRow';

function PaymentSummery({
  props: [discount, regularPrice, numNights, cabinPrice, totalPrice, isPaid],
}) {
  const totalDiscount = discount * numNights;
  const totalRegularprice = regularPrice * numNights;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-5 font-semibold text-gray-800">Payment Summary</h2>

      <div className="space-y-4 text-sm">
        <PriceRow label="Regular Price" amount={totalRegularprice} />

        <PriceRow label="Discount" amount={totalDiscount} />

        <PriceRow label="Cabin Price" amount={cabinPrice} />

        <div className="border-t border-gray-200 pt-4">
          <PriceRow label="Total Amount" amount={totalPrice} bold />
        </div>

        <div
          className={`rounded-lg p-4 ${isPaid ? 'bg-green-50' : 'bg-red-50'}`}
        >
          <p
            className={`text-sm ${isPaid ? 'text-green-600' : 'text-red-600'}`}
          >
            Payment Status
          </p>

          <div className="mt-1 flex items-center gap-2">
            {isPaid ? (
              <CheckCircle2 size={20} className="text-green-600" />
            ) : (
              <CircleAlert size={20} className="text-red-600" />
            )}

            <p
              className={`text-xl font-bold ${isPaid ? 'text-green-700' : 'text-red-700'}`}
            >
              {isPaid ? 'Paid' : 'Unpaid'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentSummery;
