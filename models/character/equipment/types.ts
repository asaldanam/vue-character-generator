import GearItem from './gear-item';
import { EQUIPMENT_SLOTS } from './config';

export interface IEquipment {
  gear?: {
    [slot in keyof typeof EQUIPMENT_SLOTS]?: GearItem;
  }
  bag?: Array<
    {type: 'gear', item: GearItem }
  >
}
