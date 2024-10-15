import dayjs from "dayjs";

export const getDatesInRange = (startDate: string, endDate: string): string[] => {
    let start = dayjs(startDate, 'YYYY-MM-DD');
    const end = dayjs(endDate, 'YYYY-MM-DD');
    const dates = [];
    
    while (start.isBefore(end) || start.isSame(end, 'day')) {
      dates.push(start.format('YYYY-MM-DD'));
      start = start.add(1, 'day');
    }
    
    return dates;
  };
  