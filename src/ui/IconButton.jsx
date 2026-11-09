function IconButton({ children, style, ...props }) {
  return (
    <button
      className={`rounded-lg p-2 flex disabled:cursor-not-allowed items-center gap-1 cursor-pointer ${style} ${props.title === 'settings' ? 'text-blue-400 hover:text-blue-500 hover:bg-blue-100' : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'}  transition  `}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
