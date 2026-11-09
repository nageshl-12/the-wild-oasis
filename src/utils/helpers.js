import {
  formatDistanceToNow,
  differenceInCalendarDays,
  parseISO,
} from 'date-fns';

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};


export function formatCurrency(value) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function getBookingDuration(startDate, endDate) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const stayDuration = differenceInCalendarDays(end, start);

  const timeAgo = formatDistanceToNow(start, {
    addSuffix: true,
  });

  return { stayDuration, timeAgo };
}
