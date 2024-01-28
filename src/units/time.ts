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

// 判斷日期差幾天
export const dateDiff = (date1: Date, date2: Date) => {
  const diff = new Date(date1).getTime() - new Date(date2).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// format 時間轉為文字 "6 月 10 日星期二"
export const formatDate = (date: Date) => {
  const originDate = new Date(date);
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  const weekDay = week[originDate.getDay()];
  return `${month} 月 ${day} 日星期${weekDay}`;
};
