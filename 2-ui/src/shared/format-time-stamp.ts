// timestamp = '2025-05-22T13:19:31+00:00'
export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${time} - ${day}`;
};
