function PriceRow({ label, amount, bold = false }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={bold ? 'font-semibold text-gray-800' : 'text-gray-500'}>
        {label}
      </span>

      <span className={bold ? 'font-semibold text-gray-800' : 'text-gray-700'}>
        ₹{amount.toLocaleString('en-IN')}
      </span>
    </div>
  );
}
export default PriceRow;
