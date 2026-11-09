import { Link } from 'react-router-dom';

function Button({ children, style, path, handleClick }) {
  const css =
    'inline-flex items-center justify-center gap-2 cursor-pointer text-center bg-gray-900 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900';

  if (path)
    return (
      <Link onClick={handleClick} to={path} className={`${css} ${style}`}>
        {children}
      </Link>
    );
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${css}
         ${style}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
