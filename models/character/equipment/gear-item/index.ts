import { Stats } from '../../types';
import { IGearItem, GearItemStats } from './types';
import { GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER } from './config'
import uuid from '~/shared/utils/uuid';

export default class GearItem implements IGearItem {
  id: string;
  type = 'gear';
  durability: number;
  stats: Partial<GearItemStats>;

  constructor(init: Partial<Omit<IGearItem, 'type'>>) {
    this.id = uuid();
    this.type = 'gear';
    this.durability = init.durability || 1;
    this.stats = init.stats || {};
  }

  getCharacterStats(): Stats {
    return Object.entries(this.stats).reduce((stats, [stat, value]) => {
      return {
        ...stats,
        [stat]: Math.round((value || 0) * GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER),
      };
    }, {})
  }
}
