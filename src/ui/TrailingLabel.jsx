function TrailingLabel({ children }) {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
      {children}
    </span>
  );
}

export default TrailingLabel;
