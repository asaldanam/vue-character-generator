import { Character } from './types';

export const CHARACTER_STATS = {
  attr_vitality: 1,
  attr_potency: 1,
  attr_tenacity: 1,
  attr_piety: 1,
  attr_precision: 1,
  attr_initiative: 1,
  skill_melee2HAtk: 1,
  skill_melee1HAtk: 1,
  skill_rangedAtk: 1,
  skill_channeledAtk: 1,
  skill_aoeAtk: 1,
  skill_degenerationAtk: 1,
  skill_directHeal: 1,
  skill_aoeHeal: 1,
  skill_regeneration: 1,
  skill_barrier: 1,
  skill_purge: 1,
  skill_activeDefense: 1,
  skill_counterAtk: 1,
  skill_parasyte: 1,
  skill_provoke: 1,
  skill_interpose: 1,
  skill_control: 1,
  skill_hide: 1,
};

export const CHARACTER_CALCULATED_FNS = {
  attr_potency: (value: number) => value * 6,
};

export const CHARACTER_EMPTY: Omit<Character, 'id'> = {
  info: {
    name: '',
    title: '',
  },
  state: {
    currentHealth: 0,
  },
  stats: CHARACTER_STATS,
};
