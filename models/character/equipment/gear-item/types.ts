import { Stats } from '../../types';
import { EquipmentSlots } from '../types';

export interface IGearItem {
  id: string;
  durability: number;
  stats: Partial<GearItemStats>;
  slot: EquipmentSlots | null;
  quality: number;
  type: 'gear';
  icon: number;
}

export type GearItemStats = Stats;
