/**
 * Returns the difference between two dates in readable text.
 * @param {Date|string|number} startDate - start date.
 * @param {Date|string|number} endDate - end date.
 * @returns {string} The difference between startDate and endDate in readable text
 */
export const textDiffInDates = (
  startDate: Date | string | number,
  endDate: Date | string | number,
): string => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const difference = Math.abs(date1.getTime() - date2.getTime());

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);
  if (minutes < 1) {
    return "Soon";
  } else if (minutes < 60) {
    return `${minutes} Minutes`;
  } else if (hours < 24) {
    return `${hours} Hours`;
  } else if (days < 7) {
    return `${days} Days`;
  } else if (weeks < 4) {
    return `${weeks} Weeks`;
  } else if (months < 12) {
    return `${months} Months`;
  } else {
    return `${years} Years`;
  }
};

export function formatTimeString(seconds: number) {
  // Calculate hours, minutes, and seconds
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Format the string
  const formattedTime = `${hrs > 0 ? hrs + "h " : ""}${mins > 0 ? mins + "m " : ""}${secs}s`;

  return formattedTime;
}

export function getTimeformatWithMomentAppend(time: number): string {
  // Calculate hours, minutes, and seconds
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;
  const getMoment = () => {
    if (hrs) return "hours";
    if (mins) return "minutes";
    return "seconds";
  };
  // Format the string
  const formattedTime = `${hrs > 0 ? hrs + ": " : ""}${mins > 0 ? mins + ": " : ""}${secs} ${getMoment()}`;

  return formattedTime;
}
