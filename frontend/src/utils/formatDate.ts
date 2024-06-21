export const formatDate = (date: Date) => {
  const newDate = new Date(date);

  return {
    date: newDate.toLocaleDateString(),
    time: newDate.toLocaleTimeString(),
  } as const;
};
