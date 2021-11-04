import { CHARACTER_CALCULATED_FNS, CHARACTER_STATS } from './constants';
import { CHARACTER_LITERALS } from './literals';
import { Character, Stat, StatValue } from './types';
import { evaluate } from 'mathjs';

/** Obtiene la descripción y nombre de una estadística */
export function getStatTxt(params: { statId?: string; character?: Character | null; lang?: 'es' }) {
  const { statId, character, lang } = params;
  if (!statId || !lang) return {};

  const literals = CHARACTER_LITERALS[lang || 'es'];
  const name = literals.statNames[statId] || statId;
  const rawDesc = literals.statDescs[statId] || statId;

  if (!character) return {};
  const desc = replaceDescCalculatedValues(rawDesc, character);

  return { name, desc };
}

/**
 * UTILS
 */

/** Reemplaza las operaciones de la descripción por su valores  */
const replaceDescCalculatedValues = (rawDesc: string, character: Character | null) => {
  const statKeys = Object.keys(CHARACTER_STATS);
  const references = findTemplateRefs(rawDesc);

  const replacements = references.map((ref) => {
    try {
      const statKey = statKeys.find((key) => ref.includes(key));
      if (!statKey || !character) return ref;
      const statValue = character?.stats[statKey];
      const statValueCalculated = getCalculatedValue(statKey, statValue);
      const operation = ref.replace(statKey, statValueCalculated);
      return [`{{${ref}}}`, evaluate(operation)];
    } catch (error) {
      return [ref, ref];
    }
  });

  const desc = replaceMany(rawDesc, replacements as [string, any][]);
  return desc;
};

/** Obtiene el valor calculado a partir de las "funciones de cálculo por stat" */
const getCalculatedValue = (stat: string | Stat, statValue: StatValue) => {
  const fn = CHARACTER_CALCULATED_FNS[stat];
  if (!fn) return null;
  const result = fn(statValue);
  return result;
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
  const betweenDoubleBrackes = new RegExp(/(?<=\{{).+?(?=\}})/g);
  return [...text.matchAll(betweenDoubleBrackes)].map((match) => match[0]);
};
