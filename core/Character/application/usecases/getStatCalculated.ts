import Character from "../../domain/Character";
import { Stat } from "../../domain/Stats/Stats";
import { CHARACTER_STATS_CONFIG } from "../../domain/Stats/statsConfig";

/** Obtiene la descripción y nombre de una estadística */
export default function getStatCalculated(params: { statId?: string; character?: Character | null }) {
  const { statId, character } = params;
  if (!statId || !character) return {};

  const stats = CHARACTER_STATS_CONFIG.getStats();
  const config = stats[statId];
  const value = character.stats[statId as Stat];
  const fn = config.calculated.fn;

  if (!fn || !value) return {};

  const result = fn(value);

  return {
    viewValue: config.calculated.template.replace('{{value}}', result.toString()),
    value: result,
  };
}
