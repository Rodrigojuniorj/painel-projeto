import { format, addMinutes } from 'date-fns';

export function DateTimeUTC(date: Date){
  return format(addMinutes(date, date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss');
}