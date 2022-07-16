import GearItem from "./gear-item";
import { IEquipment, EquipmentSlots, EquipmentItem } from "./types";
export default class Equipment implements IEquipment {
  gear: IEquipment['gear'];
  bag: IEquipment['bag'];

  constructor({ bag, gear }: Partial<IEquipment>) {
    this.bag = bag || {};
    this.gear = gear || {}
  }

  getGearList() {
    return Object.entries(this.gear).map(([slot, itemId]) => {
      const item = itemId ? this.bag[itemId] : {};
      return {
        slot: slot as EquipmentSlots,
        data: new GearItem(item),
      };
    })
  }

  updateGear(gear: Partial<IEquipment['gear']>) {
    this.gear = { ...this.gear, ...gear }
  }

  addItemsToBag(items: EquipmentItem[]) {
    items.forEach(item => {
      const id = item.id;
      this.bag = {
        ...this.bag,
        [id]: item
      }
    })
  }

}
