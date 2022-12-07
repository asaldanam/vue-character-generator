import { CHARACTER_STATS_CONFIG } from "./statsConfig";

export type StatValue = number;

export type Stats = {
  [stat in keyof ReturnType<typeof CHARACTER_STATS_CONFIG.getStats>]: StatValue;
}

export type Stat = keyof Stats;

export function createStats(stats?: Partial<Stats>): Stats {
  const defaultStatInitialValue = 1;
  const statsConfig = CHARACTER_STATS_CONFIG.getStats();

  const statsDefault = Object
    .keys(statsConfig)
    .reduce((stats, stat) => ({ ...stats, [stat]: defaultStatInitialValue }), {} as Stats)

  return {
    ...statsDefault,
    ...(stats ?? {}),
  }
}

