import { SearchX } from 'lucide-react';

function ResourceNotFound({ resource = 'Page' }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-gray-100 p-5">
            <SearchX size={42} className="text-gray-400" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          {resource} Not Found
        </h1>

        <p className="mb-6 text-sm leading-6 text-gray-500">
          Sorry, we couldn't find the {resource.toLowerCase()} you're looking
          for. It may have been deleted or doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default ResourceNotFound;
