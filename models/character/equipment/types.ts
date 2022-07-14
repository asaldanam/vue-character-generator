import ArmorItem from './armor-item';
import { EQUIPMENT_SLOTS } from './config';

export interface IEquipment {
  armor?: {
    [slot in keyof typeof EQUIPMENT_SLOTS]?: ArmorItem;
  }
  bag?: Array<
    {type: 'armor', item: ArmorItem }
  >
}
