function Form({ children, label, error, id }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id || children.props.id}
        className="text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      {children}

      {error && (
        <span className="block px-1 text-sm italic text-red-500">{error}</span>
      )}
    </div>
  );
}

export default Form;
