import { IEquipment } from "./types";

export default class Equipment implements IEquipment {
  armor: IEquipment['armor'];
  bag: IEquipment['bag'];

  constructor({ bag, armor }: Partial<IEquipment>) {
    this.bag = bag || [];
    this.armor = armor || {}
  }
}
