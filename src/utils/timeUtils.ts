
export const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch (e) {
    return time;
  }
};

export const getCurrentTimeForInput = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const calculateTotalSleepHours = (bedTime: string, wakeTime: string): number => {
  try {
    // Convert time strings to minutes since midnight
    const getMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    let bedMinutes = getMinutes(bedTime);
    let wakeMinutes = getMinutes(wakeTime);

    // Adjust for next day
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }

    // Calculate difference in hours
    return Math.round((wakeMinutes - bedMinutes) / 60 * 10) / 10;
  } catch (e) {
    return 0;
  }
};

export const isCurrentTimeBetween = (startTime: string, endTime: string): boolean => {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentMinutes = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let startMinutes = startHour * 60 + startMinute;
    let endMinutes = endHour * 60 + endMinute;

    // Handle overnight periods
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
      if (currentMinutes < startMinutes) {
        return currentMinutes + 24 * 60 <= endMinutes;
      }
    }

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  } catch (e) {
    return false;
  }
};

export const getDaySummary = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Morning';
  } else if (hour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

export const getNextEvents = (routines: { time: string; title: string }[], limit = 3): { time: string; title: string }[] => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentMinutes = currentHour * 60 + currentMinute;

  return routines
    .map(routine => {
      const [hours, minutes] = routine.time.split(':').map(Number);
      const routineMinutes = hours * 60 + minutes;
      return { ...routine, minutesFromNow: routineMinutes - currentMinutes };
    })
    .filter(routine => routine.minutesFromNow > 0)
    .sort((a, b) => a.minutesFromNow - b.minutesFromNow)
    .slice(0, limit);
};

export const getProgressPercentage = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
