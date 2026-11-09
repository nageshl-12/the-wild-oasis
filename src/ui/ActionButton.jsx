import { useState } from 'react';

function ActionButton({ children, onClick, variant = 'desc', label }) {
  const [showLabel, setShowLabel] = useState(false);
  const hoverStyle = {
    delete: 'hover:bg-red-500/10 hover:text-red-500',
    desc: 'hover:bg-blue-500/10 hover:text-blue-500',
    edit: 'hover:bg-yellow-500/10 hover:text-yellow-500',
    view: 'hover:bg-green-500/10 hover:text-green-500',
    check: 'hover:bg-emerald-500/10 hover:text-emerald-500',
    warning: 'hover:bg-orange-500/10 hover:text-orange-500',
    add: 'hover:bg-purple-500/10 hover:text-purple-500',
    info: 'hover:bg-cyan-500/10 hover:text-cyan-500',
    archive: 'hover:bg-gray-500/10 hover:text-gray-500',
  };

  return (
    <button
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onClick={onClick}
      className={`rounded-lg w-full md:w-auto p-2 hover:group text-gray-500 cursor-pointer transition-colors duration-200 flex items-center gap-1 ${hoverStyle[variant]}`}
    >
      {children}
      <span className="md:hidden text-xs uppercase">{label}</span>
      {showLabel && (
        <span className="text-xs  md:block hidden animate-fade-in-up animate-duration-200 group text-center text-gray-400">
          {label}
        </span>
      )}
    </button>
  );
}

export default ActionButton;
