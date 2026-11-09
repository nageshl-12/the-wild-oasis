import { LoaderCircle } from 'lucide-react';

function Spinner() {
  return (
    <div className="flex h-dvh items-center justify-center ">
      <LoaderCircle
        size={36}
        strokeWidth={2.5}
        className="animate-spin text-gray-800 -translate-y-3"
      />
    </div>
  );
}

export default Spinner;
