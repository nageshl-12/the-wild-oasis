function SubmitButton({ children, onClick, disabled, type }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mt-2 w-full cursor-pointer rounded-lg bg-navy py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1F2937] active:scale-[0.98]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
