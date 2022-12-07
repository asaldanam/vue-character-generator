import { Stats } from "../../domain/Stats/Stats";
import validateStat from "./validateStat";

/** Valida todas estadísticas del personaje */
export default function validateStats(stats: Stats) {
  const allValid = Object.entries(stats).every(([stat, value]) => {
    const isValid = validateStat(stat as keyof Stats, value as number);
    return isValid;
  });

  return allValid;
}
