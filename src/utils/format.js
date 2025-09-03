export const bytesToMB = (n) => (n / (1024 * 1024)).toFixed(2);
export const mmss = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
