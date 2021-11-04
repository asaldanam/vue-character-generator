import { CHARACTER_STATS } from './constants';

export interface Character {
  id: string;
  info: {
    name: string;
    title: string;
  };
  state: {
    currentHealth: number;
  };
  stats: Stats;
}

export type Stat = keyof Stats;
export type StatValue = number;
export type Stats = Partial<typeof CHARACTER_STATS>;
