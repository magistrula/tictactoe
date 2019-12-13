import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';

const rangeIdMatcher = /([-]?)(\d+)([dymw]+)/i;
const dateAdders = {
  d: addDays,
  m: addMonths,
  w: addWeeks,
  y: addYears,
};

export const asDate = time => format(time, 'yyyy-MM-dd');

export const makeRange = id => {
  const now = new Date();
  const match = id.match(rangeIdMatcher);
  if (match) {
    const sign = match[1] === '-' ? -1 : 1;
    const value = match[2];
    const adder = dateAdders[match[3].toLowerCase()];
    const startDate = asDate(adder(now, value * sign));
    const endDate = asDate(now);
    return { start: startDate, end: endDate, id };
  }
  throw new Error(`Invalid range: ${id}`);
};
