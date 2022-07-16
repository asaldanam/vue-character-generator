import { CHARACTER_STATS } from './config';
import Equipment from './equipment';
import { EquipmentItem } from './equipment/types';
import { CharacterData, Stat, Stats, StatValue } from './types';
import uuid from '~/shared/utils/uuid';

export default class Character {
  private character: CharacterData;

  constructor(character?: CharacterData) {
    this.character = {
      id: character?.id || uuid(),
      info: character?.info || CHARACTER_EMPTY.info,
      stats: { ...CHARACTER_EMPTY.stats, ...(character?.stats || {}) },
      equipment: new Equipment({ bag: character?.equipment.bag, gear: character?.equipment.gear }),
      state: character?.state || CHARACTER_EMPTY.state,
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

  /** Actualiza múltiples estadísticas en batch */
  updateStats(stats: Stats) {
    this.validateStats(stats);

    this.character.stats = { ...this.character.stats, ...stats };
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

  updateGear(gear: Partial<CharacterData['equipment']['gear']>) {
    this.character.equipment.updateGear(gear);
    this.updateStatsFromGear();
  }

  addItemsToBag(items: EquipmentItem[]) {
    this.character.equipment.addItemsToBag(items);
  }

  // Private Methods

  /** Valida un conjunto de estadísticas */
  private validateStats(stats: Stats) {
    Object.entries(stats).forEach(([stat, value]) => {
      this.validateStat(stat as keyof Stats, value as number);
    });
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
      // eslint-disable-next-line no-throw-literal
      throw `La estadística [${stat}] no satisface la regla [${rule.name}]: ${rule.descripcion}`;
    });
  }

  /** Actualiza los atributos a partir de los objetos equipados */
  private updateStatsFromGear() {
    const gear = this.character.equipment.getGearList();

    const attributes = {
      attr_initiative: 1,
      attr_piety: 1,
      attr_potency: 1,
      attr_precision: 1,
      attr_tenacity: 1,
      attr_vitality: 1,
    };

    gear.forEach(item => {
      const itemAttrs = Object.entries(item.data?.getCharacterStats() || {});

      itemAttrs.forEach(([attr, value]) => {
        attributes[attr] = attributes[attr] + value
      })
    })

    this.updateStats(attributes);
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
  equipment: new Equipment({})
};
