export const toISO = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const todayDayName = () => {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
};
