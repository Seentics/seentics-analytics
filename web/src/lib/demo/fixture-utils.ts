/** Fixed clock and seeded generator keep demo routes stable across renders and video captures. */
export const DEMO_REFERENCE_DATE = new Date('2025-03-31T12:00:00.000Z');

export function demoDate(offsetMs = 0): Date {
  return new Date(DEMO_REFERENCE_DATE.getTime() + offsetMs);
}

export function createDemoRandom(seed: string): () => number {
  let state = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    state = Math.imul(state ^ seed.charCodeAt(index), 16777619);
  }

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
