import { Stats } from '../../types';
import { IGearItem, GearItemStats } from './types';
import { GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER } from './config'
import uuid from '~/shared/utils/uuid';
import { EquipmentSlots } from '../types';

export default class GearItem implements IGearItem {
  id: string;
  type = 'gear';
  durability: IGearItem['durability'];
  stats: IGearItem['stats'];
  slot: IGearItem['slot'];

  constructor(init: Partial<IGearItem>) {
    this.id = init.id || uuid();
    this.type = 'gear';
    this.durability = init.durability || 1;
    this.stats = init.stats || {};
    this.slot = init.slot || null;
  }

  getCharacterStats(): Stats {
    return Object.entries(this.stats).reduce((stats, [stat, value]) => {
      return {
        ...stats,
        [stat]: Math.round((value || 0) * GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER),
      };
    }, {});
  }
}
