import { useSearchParams } from 'react-router-dom';

function PaginationData(PAGE_SIZE = 10, count) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const currentPage = Number(searchParams.get('page')) || 1;

  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, count);

  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }
  function handlePrev() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  return { pageCount, from, to, currentPage, handleNext, handlePrev };
}

export default PaginationData;
