import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filteredValue = searchParams.get('cabins') || 'all';
  const sortByRow = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortByRow.split('-');

  const sortBy = { field, direction };

  const page = Number(searchParams.get('page')) || 1;

  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'discount', value: filteredValue };

  const { data: { data: cabins, count } = {}, isPending } = useQuery({
    queryKey: ['cabins', filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.query({
      queryKey: ['cabins', filter, sortBy, page + 1],
      queryFn: () => getCabins({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.query({
      queryKey: ['cabins', filter, sortBy, page - 1],
      queryFn: () => getCabins({ filter, sortBy, page: page - 1 }),
    });

  return { cabins, isPending, count };
}
