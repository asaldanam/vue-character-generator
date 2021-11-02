import CHARACTER from './constants';

export interface Character {
  id: string;
  info: {
    name: string;
  };
  stats: Stats;
}

export type Stat = keyof Stats;
export type StatValue = number;
export type Stats = Partial<typeof CHARACTER.STATS>;
