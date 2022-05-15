import uuid from '~/shared/utils/uuid';
import { CHARACTER_STATS } from './stats';
import { CharacterData, Stat, Stats, StatValue } from './types';

export default class Character {
  private character: CharacterData;

  constructor(character?: CharacterData) {
    this.character = character
      ? {
          ...CHARACTER_EMPTY,
          ...character,
          stats: {
            ...CHARACTER_EMPTY.stats,
            ...character.stats,
          },
          state: {
            ...CHARACTER_EMPTY.state,
            ...character.state,
          },
        }
      : {
          id: uuid(),
          ...CHARACTER_EMPTY,
        };
  }

  // Public methods

  /** Devuelve el estado actual del personaje */
  getData() {
    return this.character;
  }

  /** Setea el estado de un */
  setData(data: CharacterData) {
    this.constructor(data);
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

  /** Decrementa en 1 una estadística */
  updateState(nextState: Partial<CharacterData['state']>) {
    const prevState = this.character.state;
    this.character.state = { ...prevState, ...nextState };
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
        descripcion: 'Debe estar comprendida entre 1 y 30',
        shouldBeValid: value >= 1 && value <= 30,
      },
    ];

    // Se comprueba que todas las reglas son válidas. Si no cumple alguna, se retorna error
    rules.forEach((rule) => {
      if (rule.shouldBeValid) return;
      throw `La estadística [${stat}] no satisface la regla [${rule.name}]: ${rule.descripcion}`;
    });
  }
}

const CHARACTER_EMPTY: Omit<CharacterData, 'id'> = {
  info: {
    name: '',
    title: '',
    avatar: '',
  },
  state: {
    currentHealth: 0,
    currentBarrier: 0,
  },
  stats: CHARACTER_STATS,
};
