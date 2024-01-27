const currentYear = new Date().getFullYear();
export const years = Array.from({ length: currentYear - 1911 }, (_, i) => ({
  value: 1911 + i,
  text: `${1911 + i} 年`,
}));
export const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  text: `${i + 1} 月`,
}));
export const days = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  text: `${i + 1} 日`,
}));
export const daysByDate = (year: string, month: string) => {
  return Array.from(
    { length: new Date(Number(year), Number(month), 0).getDate() },
    (_, index) => `${index + 1} 日`
  );
};
