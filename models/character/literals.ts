import { CHARACTER_STATS } from './constants';

type StatKeys = {
  [states in keyof Partial<typeof CHARACTER_STATS>]: string;
};

export const CHARACTER_LITERALS: {
  [lang: string]: {
    statNames: StatKeys;
    statDescs: StatKeys;
  };
} = {
  es: {
    statNames: {
      attr_initiative: 'Iniciativa',
      attr_piety: 'Piedad',
      attr_potency: 'Potencia',
      attr_tenacity: 'Tenacidad',
      attr_precision: 'Precisión',
      attr_vitality: 'Vitalidad',
      skill_aoeAtk: 'Ataque de área',
      skill_channeledAtk: 'Ataque canalizado',
      skill_aoeHeal: 'Sanación área',
      skill_barrier: 'Barrera protectora',
      skill_activeDefense: 'Defensa activa',
      skill_control: 'Efecto de control',
      skill_counterAtk: 'Contraataque',
      skill_degenerationAtk: 'Degeneración',
      skill_directHeal: 'Sanación directa',
      skill_hide: 'Sigilo',
      skill_interpose: 'Interceptar',
      skill_melee1HAtk: 'Ataque melee una manos',
      skill_melee2HAtk: 'Ataque melee dos manos',
      skill_parasyte: 'Ataque parasitador',
      skill_provoke: 'Provocar enemigo',
      skill_purge: 'Purgar aliado',
      skill_rangedAtk: 'Ataque a distancia',
      skill_regeneration: 'Sanación regenerativa',
    },
    statDescs: {
      attr_precision:
        'Determina el porcentaje de probabilidad de infligir un golpe crítico y el daño crítico causado',
      skill_melee1HAtk:
        'Realiza <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Puede realizarse hasta dos veces en el mismo turno o una vez junto a otra habilidad no ofensiva',
    },
  },
};
