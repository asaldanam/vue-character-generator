import { IArmorItem } from './types';

export default class ArmorItem implements IArmorItem {
  /** Represents item quality */
  quality: number;
  /** Represents item durability, 0 - 1 */
  durability: number;

  constructor(initialProps: IArmorItem) {
    Object.assign(this, initialProps);
    this.quality = initialProps.quality;
    this.durability = 1;
  }
}
