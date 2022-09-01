export const GEAR_ITEM_ATTRIBUTES = {
  vit: 'attr_vitality',
  pot: 'attr_potency',
  ten: 'attr_tenacity',
  pre: 'attr_precision',
  ini: 'attr_initiative',
  pie: 'attr_piety',
};

export const GEAR_ITEM_ATTRIBUTE_VALUE_MULTIPLIER = 0.1

export const GEAR_ITEM_STATS_BY_QUALITY = {
  0: [],
  1: [24],
  2: [24, 12],
  3: [24, 12, 6]
}

export const GEAR_ITEM_COLOR_BY_QUALITY = ['white', 'limegreen', 'dodgerblue', 'yellow', 'orange'];

export const GEAR_ITEM_NAME_TABLE = {
  attr_vitality: {
    main: {
      es: 'robusto',
    },
    sec: {
      es: 'del luchador',
    },
    alt: {
      es: 'vigoroso',
    }
  },
  attr_potency: {
    main: {
      es: 'potente',
    },
    sec: {
      es: 'del beligerante',
    },
    alt: {
      es: 'poderoso',
    }
  },
  attr_tenacity: {
    main: {
      es: 'recio',
    },
    sec: {
      es: 'del defensor',
    },
    alt: {
      es: 'resistente',
    }
  },
  attr_precision: {
    main: {
      es: 'preciso',
    },
    sec: {
      es: 'del asesino',
    },
    alt: {
      es: 'certero',
    }
  },
  attr_initiative: {
    main: {
      es: 'raudo',
    },
    sec: {
      es: 'del asaltante',
    },
    alt: {
      es: 'veloz',
    }
  },
  attr_piety: {
    main: {
      es: 'piadoso',
    },
    sec: {
      es: 'del sanador',
    },
    alt: {
      es: 'compasivo',
    }
  },
}
