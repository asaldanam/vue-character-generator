import { CHARACTER_STATS } from './stats';

export interface CharacterData {
  id: string;
  info: {
    name: string;
    title: string;
    avatar?: string;
  };
  state: {
    currentHealth: number;
    currentBarrier: number;
  };
  stats: Stats;
}

export type Stat = keyof Stats;
export type StatValue = number;
export type Stats = Partial<typeof CHARACTER_STATS>;
export type StatsConfig = {
  [stat in Stat]: StatConfig;
};
export type StatConfig = {
  calculated: {
    fn: (value: number) => number;
    template: string;
  };
  txt: {
    es: {
      name: string;
      desc: string;
      short?: string;
    };
  };
  color?: string;
};
