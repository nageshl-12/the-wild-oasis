const styles = {
  unconfirmed: 'bg-green-600 text-white hover:bg-green-700',
  'checked-in': 'bg-blue-600 text-white hover:bg-blue-700 ',
  'checked-out': 'bg-gray-100 text-gray-500 cursor-not-allowed grayscale',
};
function ActivityActionButton({ status, children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'checked-out' || disabled}
      className={`px-3 py-1.5 w-25 text-sm font-medium rounded-md transition-colors cursor-pointer ${styles[status]}`}
    >
      {children}
    </button>
  );
}

export default ActivityActionButton;
