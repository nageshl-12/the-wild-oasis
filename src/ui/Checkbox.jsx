function Checkbox({ disabled, checked, onChange, label, id }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-green-600 cursor-pointer disabled:grayscale"
      />

      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

export default Checkbox;
