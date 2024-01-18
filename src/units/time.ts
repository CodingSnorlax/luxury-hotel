const currentYear = new Date().getFullYear();
export const years = Array.from(
  { length: currentYear - 1911 },
  (_, i) => 1911 + i
);
export const months = Array.from({ length: 12 }, (_, i) => i + 1);
export const days = Array.from({ length: 31 }, (_, i) => i + 1);
