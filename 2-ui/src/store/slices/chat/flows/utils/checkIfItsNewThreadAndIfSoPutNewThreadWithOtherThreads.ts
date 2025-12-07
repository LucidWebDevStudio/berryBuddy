export const checkIfItsNewThreadAndIfSoPutNewThreadWithOtherThreads = (
  thread: any,
  selectedThreadId: any,
  alreadyExistingThreads: any
) => {
  // Means first message in thread
  if (!selectedThreadId) {
    return {
      ...alreadyExistingThreads,
      [thread.threadId]: thread,
    };
  } else {
    return alreadyExistingThreads;
  }
};
