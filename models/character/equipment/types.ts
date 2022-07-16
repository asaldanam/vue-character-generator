import GearItem from './gear-item';
import { EQUIPMENT_SLOTS } from './config';
export interface IEquipment {
  gear: {
    [slot in EquipmentSlots]?: string; // bag uuid
  };
  bag: {
    [id: string]: EquipmentItem;
  };
}

export type EquipmentSlots = keyof typeof EQUIPMENT_SLOTS;
export type EquipmentItem = GearItem;
