import { House } from 'lucide-react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
        <House size={21} />
      </div>

      <div>
        <h1 className="font-bold text-gray-900">The Wild Oasis</h1>
        <p className="text-xs text-gray-400">Management</p>
      </div>
    </Link>
  );
}

export default Logo;
