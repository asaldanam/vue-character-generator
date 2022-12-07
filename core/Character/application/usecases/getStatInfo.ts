import { evaluate } from 'mathjs';
import { CHARACTER_STATS_CONFIG } from '../../domain/Stats/statsConfig';
import { createStats, Stat, StatValue } from '../../domain/Stats/Stats';
import Character from '../../domain/Character';

/** Obtiene la descripción y nombre de una estadística */
export default function getStatInfo(params: {
  statId?: string;
  character?: Character;
  lang?: 'es';
}) {
  const { statId, character, lang } = params;
  if (!statId || !lang) return {};

  const statConfig = stats[statId];
  const literals = statConfig.txt.es;
  const rawDesc = literals.desc;

  if (!character) return {};
  const desc = replaceDescCalculatedValues(rawDesc, character);

  return {
    name: literals.name,
    short: literals.short,
    desc,
    color: statConfig.color,
  };
}

// Helpers

/** Reemplaza las operaciones de la descripción por su valores  */
const replaceDescCalculatedValues = (rawDesc: string, character: Character) => {
  const statKeys = Object.keys(createStats()) as Stat[];
  const references = findTemplateRefs(rawDesc);

  const replacements = references.map((ref) => {
    try {
      const statKey = statKeys.find((key) => ref.includes(key));
      if (!statKey || !character) return ref;

      const statShortTxt = stats[statKey].txt.es.short
      const statColor = stats[statKey].color
      const statValue = character?.stats[statKey];
      const statValueCalculated = getCalculatedValue(statKey, statValue);
      const operation = ref.replace(statKey, statValueCalculated);
      const result = Math.ceil(evaluate(operation));
      const replacement = `<span class="attr" style="background: ${statColor}">${result} ${statShortTxt}</span>`;

      return [`{{${ref}}}`, replacement];
    } catch (error) {
      return [ref, ref];
    }
  });

  const desc = replaceMany(rawDesc, replacements as [string, any][]);
  return desc;
};

/** Obtiene el valor calculado a partir de las "funciones de cálculo por stat" */
const getCalculatedValue = (statId: string | Stat, statValue: StatValue): string => {
  const statConfig = stats[statId];
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

const stats = CHARACTER_STATS_CONFIG.getStats();
