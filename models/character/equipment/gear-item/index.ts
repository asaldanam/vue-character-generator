import uuid from '~/shared/utils/uuid';
import { Stat, Stats } from '../../types';
import { GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER, GEAR_ITEM_STATS_BY_QUALITY } from './config';
import { IGearItem } from './types';

export default class GearItem implements IGearItem {
  id: IGearItem['id'];
  type: IGearItem['type'] = 'gear';
  durability: IGearItem['durability'];
  icon: IGearItem['icon'];
  stats: IGearItem['stats'];
  slot: IGearItem['slot'];
  quality: IGearItem['quality'];

  constructor(init?: Partial<IGearItem>) {
    this.id = init?.id || uuid();
    this.stats = init?.stats || {};
    this.durability = init?.durability || 1;
    this.slot = init?.slot || null;
    this.icon = init?.icon || 0;
    this.quality = init?.quality || 0;
  }

  generate(slot: IGearItem['slot'], stats: Stat[]) {
    this.slot = slot;
    this.quality = stats.length;
    this.setStats(stats);
    this.generateIcon();
    return this;
  }

  setStats(stats: Stat[]) {
    this.stats = stats.reduce((statsObj, stat, index) => {
      return {
        ...statsObj,
        [stat]: GEAR_ITEM_STATS_BY_QUALITY[this.quality][index],
      };
    }, {});
  }

  /** TODO */
  generateIcon() {
    this.icon = 0;
  }

  /** Provides character stats value points */
  getCharacterStats(): Stats {
    return Object.entries(this.stats).reduce((stats, [stat, value]) => {
      return {
        ...stats,
        [stat]: Math.round((value || 0) * GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER),
      };
    }, {});
  }
}
