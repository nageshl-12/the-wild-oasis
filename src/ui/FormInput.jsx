function FormInput({ ...props }) {
  return (
    <input
      className={`w-full rounded-xl ${props.disabled && 'cursor-not-allowed bg-blue-50'} border border-gray-200 ${props.type === 'file' ? 'py-1 px-1' : ' px-4 py-3'} text-sm outline-none focus:border-gray-900 ${
        props.type === 'file'
          ? 'file:cursor-pointer text-white  file:rounded-lg file:px-5 file:py-2 file:bg-blue-600   file:text-sm file:font-medium'
          : ''
      }`}
      {...props}
    />
  );
}

export default FormInput;
