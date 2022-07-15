import { IGearItem } from './types';

export default class GearItem implements IGearItem {
  /** Represents item quality */
  quality: number;
  /** Represents item durability, 0 - 1 */
  durability: number;

  constructor(initialProps: IGearItem) {
    Object.assign(this, initialProps);
    this.quality = initialProps.quality;
    this.durability = 1;
  }
}
