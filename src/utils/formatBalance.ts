export function formatBalance(
  value: number | string = 0,
  precision: number = 2,
) {
  return Number(value).toLocaleString('pl-PL', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}
