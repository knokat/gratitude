export const PALETTE_COLORS = [
  '#2A9D8F', // Verdigris
  '#E9C46A', // Tuscan Sun
  '#F4A261', // Sandy Brown
  '#E76F51', // Burnt Peach
  '#264653', // Charcoal Blue
];

export function getDayColor(date: Date): string {
  // Get day of week (0-6, where 0 is Sunday)
  // We want Monday to be 0, so we adjust
  const day = date.getDay();
  const adjustedDay = day === 0 ? 6 : day - 1; // 0 (Mon) to 6 (Sun)
  return PALETTE_COLORS[adjustedDay % PALETTE_COLORS.length];
}
