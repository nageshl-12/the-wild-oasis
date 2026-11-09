import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_SIZE } from '../utils/constants';

import PaginationData from '../utils/PaginationData';

function Pagination({ count }) {
  const { pageCount, from, to, currentPage, handleNext, handlePrev } =
    PaginationData(PAGE_SIZE, count);

  if (count <= PAGE_SIZE) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="font-medium text-sm text-gray-500">
          Showing {from}–{to} of {count}
        </span>

        <button
          disabled={currentPage === pageCount}
          onClick={handleNext}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
