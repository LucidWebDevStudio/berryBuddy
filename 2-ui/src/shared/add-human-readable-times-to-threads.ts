import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { formatTimestamp } from "./format-time-stamp";

export const addHumanReadableTimesToThreads = (rawThreads: any) => {
  const groups: Record<string, { title: string }[]> = {};

  for (const thread of rawThreads) {
    const createdAt = new Date(thread.createdAtTimeStamp);
    let dateLabel: string;

    if (isToday(createdAt)) {
      dateLabel = "Today";
    } else if (isYesterday(createdAt)) {
      dateLabel = "Yesterday";
    } else {
      const daysDiff = differenceInDays(new Date(), createdAt);

      if (daysDiff <= 7) {
        dateLabel = "Last 7 Days";
      } else if (daysDiff <= 30) {
        dateLabel = "Last 30 Days";
      } else {
        dateLabel = format(createdAt, "yyyy-MM"); // group older into YYYY-MM
      }
    }

    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }

    groups[dateLabel].push({
      title: formatTimestamp(thread.createdAtTimeStamp),
      ...thread,
    });
  }

  // 🆕 Sort threads within each group: newest first
  for (const group of Object.values(groups)) {
    group.sort(
      (a: any, b: any) =>
        new Date(b.createdAtTimeStamp).getTime() -
        new Date(a.createdAtTimeStamp).getTime()
    );
  }

  // ✅ Sort date groups: Today > Yesterday > Last 7 Days > Last 30 Days > older
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    const priority = (label: string) => {
      if (label === "Today") return 5;
      if (label === "Yesterday") return 4;
      if (label === "Last 7 Days") return 3;
      if (label === "Last 30 Days") return 2;
      return 1; // months get lowest priority
    };

    const pA = priority(a);
    const pB = priority(b);

    if (pA !== pB) return pB - pA;
    return b.localeCompare(a); // for YYYY-MM
  });

  return sortedKeys.map((date) => ({
    date,
    chats: groups[date],
  }));
};

// return data example = [
//   {
//     date: 'Today',
//     chats: [
//       { title: 'How many cars' },
//       { title: 'What is today' },
//       {
//         title:
//           'How much rock weighs in dirt road over seasmuch rock weighs in dirt road over seas',
//       },
//     ],
//   },]
