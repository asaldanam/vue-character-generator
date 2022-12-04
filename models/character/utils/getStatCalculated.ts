import { CHARACTER_STATS_CONFIG } from '../stats';
import { CharacterData, Stat, StatConfig } from '../types';

/** Obtiene la descripción y nombre de una estadística */
export default function (params: { statId?: string; character?: CharacterData | null }) {
  const { statId, character } = params;
  if (!statId || !character) return {};

  const config = CHARACTER_STATS_CONFIG[statId] as StatConfig;
  const value = character.stats[statId as Stat];
  const fn = config.calculated.fn;

  if (!fn || !value) return {};

  const result = fn(value);

  return {
    viewValue: config.calculated.template.replace('{{value}}', result.toString()),
    value: result,
  };
}
