function FileInput({ ...props }) {
  return (
    <input
      type="file"
      className="w-full cursor-pointer rounded-xl border border-gray-200 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700"
      {...props}
    />
  );
}

export default FileInput;
