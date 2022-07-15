import { IEquipment } from "./types";

export default class Equipment implements IEquipment {
  gear: IEquipment['gear'];
  bag: IEquipment['bag'];

  constructor({ bag, gear }: Partial<IEquipment>) {
    this.bag = bag || [];
    this.gear = gear || {}
  }
}
