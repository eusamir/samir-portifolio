/** As peças do logo (do SVG original do Samir) no estilo novo, em faixas que correm sem fim. */
export const GLYPHS = {
  s: {
    vb: '8 2 98 60',
    w: 1.6,
    html: '<path class="gs" d="M38 12 A20 20 0 0 0 38 52 C52 52 56 12 70 12 A20 20 0 0 1 70 52"/>',
  },
  a: {
    vb: '104 2 58 60',
    w: 0.95,
    html: '<path class="gs" d="M112 54 L133 10 L154 54"/>',
  },
  m: {
    vb: '164 4 64 58',
    w: 1.05,
    html: '<path class="gs" d="M172 54 V28 A16 16 0 0 1 204 28 V54 M204 28 A16 16 0 0 1 220 12"/>',
  },
  t: {
    vb: '212 4 46 16',
    w: 0.75,
    html: '<path class="gs" d="M220 12 H250"/>',
  },
  b: {
    vb: '250 1 22 22',
    w: 0.36,
    html: '<circle class="gb" cx="261" cy="12" r="9.5"/>',
  },
  d: {
    vb: '252 3 18 18',
    w: 0.26,
    html: '<circle class="gb" cx="261" cy="12" r="6.5"/>',
  },
  o: {
    vb: '245 -4 32 32',
    w: 0.52,
    html: '<circle class="gr" cx="261" cy="12" r="11.6"/>',
  },
} as const
export type GlyphKey = keyof typeof GLYPHS
export const SEQUENCE: GlyphKey[] = [
  's',
  'd',
  'm',
  't',
  'o',
  'a',
  'b',
  's',
  't',
  'm',
  'd',
  'a',
  'o',
  'b',
]
export const LANES = [
  { top: 12, size: 34, speed: 16, op: 0.28, gap: 1.6, off: 3 },
  { top: 30, size: 58, speed: 34, op: 0.5, gap: 1.3, off: 0 },
  { top: 50, size: 42, speed: 24, op: 0.36, gap: 1.5, off: 6 },
  { top: 69, size: 70, speed: 46, op: 0.58, gap: 1.2, off: 9 },
  { top: 88, size: 30, speed: 13, op: 0.24, gap: 1.8, off: 4 },
]
