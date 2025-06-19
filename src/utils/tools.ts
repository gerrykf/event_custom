/**
 * 补零函数：数字小于 10 则在前面加 0
 * @param num 要处理的数字
 * @returns 返回字符串（如 9 -> "09"，12 -> "12"）
 */
export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * 格式化金额为带千分位逗号的字符串
 * @param amount 数值（可以是 number 或 string）
 * @returns 例如：1234567.89 -> "1,234,567.89"
 */
export const formatAmount = (amount: number | string): string => {
  const num = Number(amount);
  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // 保留小数点后最多两位
  });
};
