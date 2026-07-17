/** Форматирует дату (ISO или Date) в привычный русский вид «17.07.2026». */
export function formatDate(value) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/** Форматирует вес в кг с одним знаком после запятой при необходимости. */
export function formatWeight(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  const rounded = Math.round(num * 10) / 10;
  return `${rounded} кг`;
}
