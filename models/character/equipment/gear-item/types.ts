import { Stats } from "~/models/character/types";

export interface IGearItem extends Partial<Stats> {
  quality: number;
  durability: number;
}
