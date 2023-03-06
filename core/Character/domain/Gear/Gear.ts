import Item from './Item/Item';

export interface Gear {
  [uuid: string]: Item;
}

export function createGear(gear?: Gear) {
  return gear || {};
}
