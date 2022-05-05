import { CHARACTER_STATS, CHARACTER_STATS_CONFIG } from '../stats';
import { CharacterData, Stat, StatValue, StatConfig } from '../types';
import { evaluate } from 'mathjs';

/** Obtiene la descripción y nombre de una estadística */
export default function (params: {
  statId?: string;
  character?: CharacterData | null;
  lang?: 'es';
}) {
  const { statId, character, lang } = params;
  if (!statId || !lang) return {};

  const statConfig = CHARACTER_STATS_CONFIG[statId] as StatConfig;
  const literals = statConfig.txt.es;
  const name = literals.name;
  const rawDesc = literals.desc;

  if (!character) return {};
  const desc = replaceDescCalculatedValues(rawDesc, character);

  return { name, desc };
}

// Helpers

/** Reemplaza las operaciones de la descripción por su valores  */
const replaceDescCalculatedValues = (rawDesc: string, character: CharacterData | null) => {
  const statKeys = Object.keys(CHARACTER_STATS);
  const references = findTemplateRefs(rawDesc);

  const replacements = references.map((ref) => {
    try {
      const statKey = statKeys.find((key) => ref.includes(key));
      if (!statKey || !character) return ref;
      const statValue = character?.stats[statKey];
      const statValueCalculated = getCalculatedValue(statKey, statValue);
      const operation = ref.replace(statKey, statValueCalculated);
      return [`{{${ref}}}`, Math.ceil(evaluate(operation))];
    } catch (error) {
      return [ref, ref];
    }
  });

  const desc = replaceMany(rawDesc, replacements as [string, any][]);
  return desc;
};

/** Obtiene el valor calculado a partir de las "funciones de cálculo por stat" */
const getCalculatedValue = (statId: string | Stat, statValue: StatValue): string => {
  const statConfig = CHARACTER_STATS_CONFIG[statId] as StatConfig;
  const fn = statConfig.calculated.fn;
  if (!fn) return '';
  const result = fn(statValue);
  return result?.toString() || '';
};

/** Reemplaza todas las referencias encontradas de un literal */
const replaceMany = (origin: string, replacements: [string, any][]) => {
  const replaced = replacements.reduce((result, [from, to]) => {
    return result.replace(from, to);
  }, origin);
  return replaced;
};

/** Encuentra todas las referencias entre {{corchetes}} de una string  */
const findTemplateRefs = (text: string) => {
  const betweenDoubleBrackes = /\{{(.*?)\}}/g;
  const matches = [...text.matchAll(betweenDoubleBrackes)].map((match) =>
    replaceMany(match[0], [
      ['{{', ''],
      ['}}', ''],
    ]),
  );
  return matches;
};
