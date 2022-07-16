import { Stats } from '../../types';

export interface IGearItem {
  id: string;
  durability: number;
  type: string;
  stats: Partial<GearItemStats>;
}

export type GearItemStats = Stats;
