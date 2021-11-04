import { Character, Stat, Stats, StatValue } from './types';
import { CHARACTER_EMPTY } from './constants';
export default class CharacterService {
  private character: Character;

  constructor(character: Character) {
    this.character = {
      ...CHARACTER_EMPTY,
      ...character,
      stats: {
        ...CHARACTER_EMPTY.stats,
        ...character.stats,
      },
    };
  }

  // Public methods

  /** Devuelve el estado actual del personaje */
  get() {
    return this.character;
  }

  /** Actualiza múltiples estadísticas */
  setStats(stats: Stats, mode: 'set' | 'update' = 'set') {
    this.validateStats(stats);

    if (mode === 'set') this.character.stats = stats;
    if (mode === 'update') this.character.stats = { ...this.character.stats, ...stats };
  }

  /** Actualiza una estadística al valor indicado */
  setStatValue(stat: Stat, value: StatValue) {
    this.validateStat(stat, value);

    (this.character.stats || {})[stat] = value;
  }

  /** Incrementa en 1 una estadística */
  upStatValue(stat: Stat) {
    const newValue = ((this.character.stats || {})[stat] || 0) + 1;
    this.setStatValue(stat, newValue);
  }

  /** Decrementa en 1 una estadística */
  downStatValue(stat: Stat) {
    const newValue = ((this.character.stats || {})[stat] || 0) - 1;
    this.setStatValue(stat, newValue);
  }

  // Private Methods

  /** Valida un conjunto de estadísticas */
  private validateStats(stats: Stats) {
    const allValid = Object.entries(stats).every(([stat, value]) => {
      const isValid = this.validateStat(stat as keyof Stats, value as number);
      return isValid;
    });
    return allValid;
  }

  /** Valida una estadística */
  private validateStat(stat: Stat, value: StatValue) {
    // Se declara el array de reglas que validan las estadísticas
    const rules = [
      {
        name: 'threshold',
        descripcion: 'Debe estar comprendida entre 0 y 30',
        shouldBeValid: value >= 0 && value <= 30,
      },
    ];

    // Se comprueba que todas las reglas son válidas. Si no cumple alguna, se retorna error
    rules.forEach((rule) => {
      if (rule.shouldBeValid) return;
      throw `La estadística [${stat}] no satisface la regla [${rule.name}]: ${rule.descripcion}`;
    });
  }
}
