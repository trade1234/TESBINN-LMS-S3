export const minutesToDurationLabel = (minutes?: number) => {
  const m = typeof minutes === "number" ? minutes : 0;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h <= 0) return `${mm}m`;
  return `${h}h ${mm}m`;
};
