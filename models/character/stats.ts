import { StatConfig, StatsConfig } from './types';

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

const CALC_FNS: {
  [key: string]: StatConfig['calculated']['fn'];
} = {
  /** Obtiene la puntuación de un stat a partir de su valor */
  attrBase: (value: number) => value * 6,

  /** Obtiene la dificultad a superar en base el valor de una habilidad */
  skillDC: (value: number) => {
    const MULTIPLIER = 8;
    const BASE = 0;

    const appliedValue = value * 2 - 1;
    const percent = 1 - appliedValue / (appliedValue + MULTIPLIER) - BASE;

    const result = Math.round(percent * 20);
    return result;
  },
};

const CALC_TEMPLATES = {
  points: '{{value}} p',
  dc: 'DC {{value}}',
};

export const CHARACTER_STATS_CONFIG: StatsConfig = {
  attr_vitality: {
    txt: {
      es: {
        name: 'Vitalidad',
        desc: 'attr_vitality',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  attr_potency: {
    txt: {
      es: {
        name: 'Potencia',
        desc: 'Determina la cantidad de puntos de vida infligidos de los ataques y otros efectos dañinos',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  attr_tenacity: {
    txt: {
      es: {
        name: 'Tenacidad',
        desc: 'attr_tenacity',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  attr_piety: {
    txt: {
      es: {
        name: 'Piedad',
        desc: 'attr_piety',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  attr_precision: {
    txt: {
      es: {
        name: 'Precisión',
        desc: 'attr_precision',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  attr_initiative: {
    txt: {
      es: {
        name: 'Iniciativa',
        desc: 'attr_initiative',
      },
    },
    calculated: {
      fn: CALC_FNS.attrBase,
      template: CALC_TEMPLATES.points,
    },
  },
  skill_melee2HAtk: {
    txt: {
      es: {
        name: 'Ataque melee dos manos',
        desc: 'skill_melee2HAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_melee1HAtk: {
    txt: {
      es: {
        name: 'Ataque melee una mano',
        desc: 'Realiza <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Puede realizarse hasta dos veces en el mismo turno o una vez junto a otra habilidad no ofensiva',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_rangedAtk: {
    txt: {
      es: {
        name: 'Ataque a distancia',
        desc: 'skill_rangedAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_channeledAtk: {
    txt: {
      es: {
        name: 'Ataque canalizado',
        desc: 'skill_channeledAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_aoeAtk: {
    txt: {
      es: {
        name: 'Ataque de área',
        desc: 'skill_aoeAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_degenerationAtk: {
    txt: {
      es: {
        name: 'Ataque degenerativo',
        desc: 'skill_degenerationAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_directHeal: {
    txt: {
      es: {
        name: 'Sanación directa',
        desc: 'skill_directHeal',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_aoeHeal: {
    txt: {
      es: {
        name: 'Sanación de área',
        desc: 'skill_aoeHeal',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_regeneration: {
    txt: {
      es: {
        name: 'Sanación regenerativa',
        desc: 'skill_regeneration',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_barrier: {
    txt: {
      es: {
        name: 'Sanación barrera',
        desc: 'skill_barrier',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_purge: {
    txt: {
      es: {
        name: 'Purgar aliado',
        desc: 'skill_purge',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_activeDefense: {
    txt: {
      es: {
        name: 'Defensa activa',
        desc: 'skill_activeDefense',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_counterAtk: {
    txt: {
      es: {
        name: 'Actitud de contraataque',
        desc: 'skill_counterAtk',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_parasyte: {
    txt: {
      es: {
        name: 'Ataque parasitador',
        desc: 'skill_parasyte',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_provoke: {
    txt: {
      es: {
        name: 'Provocar enemmigo',
        desc: 'skill_provoke',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_interpose: {
    txt: {
      es: {
        name: 'Interceptar ataque',
        desc: 'skill_interpose',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_control: {
    txt: {
      es: {
        name: 'Efecto de control',
        desc: 'skill_control',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
  skill_hide: {
    txt: {
      es: {
        name: 'Sigilo',
        desc: 'skill_hide',
      },
    },
    calculated: {
      fn: CALC_FNS.skillDC,
      template: CALC_TEMPLATES.dc,
    },
  },
};
