import { IEquipment, EquipmentSlots, EquipmentItem } from "./types";
export default class Equipment implements IEquipment {
  gear: IEquipment['gear'];
  bag: IEquipment['bag'];

  constructor({ bag, gear }: Partial<IEquipment>) {
    this.bag = bag || {};
    this.gear = gear || {}
  }

  getGearList() {
    return Object.entries(this.gear).map(([slot, itemId]) => ({
      slot: slot as EquipmentSlots,
      data: itemId ? this.bag[itemId] : null
    }))
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
