import { Stats } from "~/models/character/types";

export interface IArmorItem extends Partial<Stats> {
  quality: number;
  durability: number;
}
