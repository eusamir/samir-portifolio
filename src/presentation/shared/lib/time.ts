const MONTHS = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

/** 2023.25 -> "abr 2023" */
export function formatDecimalYear(value: number): string {
  const year = Math.floor(value)
  const month = Math.min(11, Math.floor((value - year) * 12 + 1e-6))
  return `${MONTHS[month]} ${year}`
}

export function nowDecimal(date = new Date()): number {
  return date.getFullYear() + date.getMonth() / 12 + (date.getDate() - 1) / 365
}

export function traceDuration(startDecimal: number, date = new Date()): string {
  const months = Math.max(0, Math.round((nowDecimal(date) - startDecimal) * 12))
  const y = Math.floor(months / 12)
  const m = months % 12
  return `${y} anos${m ? ` e ${m} ${m === 1 ? 'mês' : 'meses'}` : ''}`
}
