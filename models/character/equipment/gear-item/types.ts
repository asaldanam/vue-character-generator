import { Stats } from '../../types';
import { EquipmentSlots } from '../types';

export interface IGearItem {
  id: string;
  durability: number;
  type: string;
  stats: Partial<GearItemStats>;
  slot: EquipmentSlots | null;
}

export type GearItemStats = Stats;
