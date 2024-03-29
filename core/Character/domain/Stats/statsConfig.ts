
export const CHARACTER_STATS_CONFIG = {
  getStats() {
    return {
      attr_vitality: {
        txt: {
          es: {
            name: 'Vitalidad',
            short: 'Vit',
            desc: 'Determina en <strong>{{ attr_vitality * 1 }} de puntos de salud</strong> la vida del personaje. También determina los efectos de las habilidades que permite sanarse así mismo.',
          },
        },
        calculated: {
          fn: this.calcFns.healthBase,
          template: this.calcTemplates.hp,
        },
        color: 'lightgreen',
      },
      attr_potency: {
        txt: {
          es: {
            name: 'Potencia',
            short: 'Pot',
            desc: 'Determina la cantidad de puntos de daño infligidos por las habilidades ofensivas.',
          },
        },
        calculated: {
          fn: this.calcFns.attrBase,
          template: this.calcTemplates.points,
        },
        color: 'lightcoral',
      },
      attr_tenacity: {
        txt: {
          es: {
            name: 'Tenacidad',
            short: 'Ten',
            desc: 'Determina los efectos de las habilidades que permiten evitar daños y protegerse, también de aquellas que inhabilitan a los contrincantes. Además, permite al personaje bloquear o parar una habilidad ofensiva del adversario si no ha superado <strong>{{ 1 + (attr_tenacity / 2) }} en su tirada</strong> de dificultad.',
          },
        },
        calculated: {
          fn: this.calcFns.attrBase,
          template: this.calcTemplates.points,
        },
        color: 'lightseagreen',
      },
      attr_piety: {
        txt: {
          es: {
            name: 'Piedad',
            short: 'Pie',
            desc: 'Determina la potencia de las habilidades de sanación, barrera y bendiciones que se lanzan sobre los aliados.',
          },
        },
        calculated: {
          fn: this.calcFns.attrBase,
          template: this.calcTemplates.points,
        },
        color: 'lightskyblue',
      },
      attr_precision: {
        txt: {
          es: {
            name: 'Precisión',
            short: 'Pre',
            desc: 'Determina la probabilidad y potencia de los efectos críticos. Toda tirada con éxito que sea igual o superior a <strong>{{ 20 - (attr_precision / 6) }}</strong> será considerada crítico. Las consencuencias de una tirada crítica se describen en cada habilidad.',
          },
        },
        calculated: {
          fn: this.calcFns.attrBase,
          template: this.calcTemplates.points,
        },
        color: 'lightsalmon'
      },
      attr_initiative: {
        txt: {
          es: {
            name: 'Iniciativa',
            short: 'Ini',
            desc: 'Determina la eficacia de las habilidades que permiten esconderse y atacar en primer lugar. Además, permite al personaje esquivar una habilidad ofensiva del adversario si no ha superado <strong>{{ 1 + (attr_initiative / 2) }} en su tirada</strong> de dificultad.',
          },
        },
        calculated: {
          fn: this.calcFns.attrBase,
          template: this.calcTemplates.points,
        },
        color: 'lightpink',
      },
      skill_melee2HAtk: {
        txt: {
          es: {
            name: 'Atq. melee dos manos',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 1}} puntos</strong> de daño. Si resulta crítico, aplicará <strong>{{attr_precision * 1.5}} puntos </strong> de daño crítico adicional.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_melee1HAtk: {
        txt: {
          es: {
            name: 'Atq. melee una mano',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Puede realizarse hasta dos veces en el mismo turno o una vez junto a otra habilidad no ofensiva. Si resulta crítico, aplicará <strong>{{attr_precision * 0.5}} puntos </strong> de daño crítico adicional.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_rangedAtk: {
        txt: {
          es: {
            name: 'Ataque a distancia',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 1}} puntos</strong> de daño. Si el objetivo aún no ha alcanzado al tirador o huye de él, el tirador dispondrá de ventaja para impactar. En cambio si el objetivo se encuentra cerca un aliado, fallar aplicará el daño colateral al aliado. Si resulta crítico, aplicará <strong>{{attr_precision * 1}} puntos </strong> de daño crítico adicional.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_channeledAtk: {
        txt: {
          es: {
            name: 'Ataque canalizado',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 2.5}} puntos</strong> de daño. El taumaturgo deberá permanecer un turno preparando la habilidad. Si recibe daño se verá interrumpido y deberá volver a empezar de nuevo. Si resulta crítico, aplicará <strong>{{attr_precision * 1}} puntos </strong> de daño crítico adicional.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_aoeAtk: {
        txt: {
          es: {
            name: 'Ataque de área',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Impactará a todos los enemigos en un area cercana hasta un máximo de 4. Podrá provocar efectos colaterales en aliados cercanos. Si resulta crítico, aplicará <strong>{{attr_precision * 0.33}} puntos </strong> de daño crítico adicional a cada objetivo.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_degenerationAtk: {
        txt: {
          es: {
            name: 'Ataque degenerativo',
            short: '',
            desc: 'Si el atacante tiene éxito, éste y los dos próximos turnos sufrirá <strong>{{attr_potency * 0.5}} puntos</strong> de daño o en caso de ser lanzado a varios <strong>{{attr_potency * 0.33}} puntos</strong> de daño por turno, hasta un máximo de 3 enemigos. Podrá provocar efectos colaterales en aliados cercanos.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_directHeal: {
        txt: {
          es: {
            name: 'Sanación directa',
            short: '',
            desc: 'Curará al objetivo <strong>{{attr_piety * 1}} puntos</strong> de vida y en caso de crítico <strong>{{attr_precision * 1}} puntos </strong> adicionales. Alternativamente y si es para curarse así mismo, podrá usarse el atributo de vitalidad si es más alto, sanando <strong>{{attr_vitality * 0.15}} puntos</strong> de su propia vida.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_aoeHeal: {
        txt: {
          es: {
            name: 'Sanación de área',
            short: '',
            desc: 'Curará <strong>{{attr_piety * 0.33}} puntos</strong> de vida hasta un máximo de 3 objetivos cercanos entre sí. Si resulta crítico, curará <strong>{{attr_precision * 0.33}} puntos</strong> adicionales a cada aliado curado.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_regeneration: {
        txt: {
          es: {
            name: 'Sanación regenerativa',
            short: '',
            desc: 'Curará al objetivo <strong>{{attr_piety * 0.33}} puntos</strong> de vida durante éste y los próximos dos turnos. Alternativamente y si es para curarse así mismo, podrá usarse el atributo de vitalidad si es más alto, sanando <strong>{{attr_vitality * 0.7}} puntos</strong> por turno.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_barrier: {
        txt: {
          es: {
            name: 'Barrera',
            short: '',
            desc: 'Creará un escudo protector en el objetivo de hasta <strong>{{attr_piety * 1}} puntos</strong>, si resulta crítico, podra proteger de otros <strong>{{attr_precision * 1}} puntos </strong> de vida adicionales. Alternativamente y si es para protegerse así mismo, podrá usarse el atributo de tenacidad si es más alto, ganando una barrera de <strong>{{attr_tenacity * 0.5}} puntos</strong>. El escudo durará tres turnos y no podrá renovarse hasta pasado ese tiempo.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_powerEnhancement: {
        txt: {
          es: {
            name: 'Bendición: daño adicional',
            short: '',
            desc: 'Bendices las acciones ofensivas tuyas o de un aliado <strong>{{attr_piety / 8}} turnos</strong> para que inflinjan <strong>{{attr_piety * 0.66}} puntos</strong> de daño adicional si impactan en su objetivo. Si se lanza sobre varios objetivos (hasta un máximo de tres), podrán infligir <strong>{{attr_piety * 0.22}} puntos</strong> cada uno.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_purge: {
        txt: {
          es: {
            name: 'Purgar aliado',
            short: '',
            desc: 'Si se realiza con éxito, eliminará <strong>{{attr_piety / 8}} efectos adversos</strong> del aliado objetivo o de sí mismo o <strong>{{attr_tenacity / 8}} efectos beneficiosos</strong> de un enemigo. Si resulta crítico, eliminara <strong>{{attr_precision / 8}} efectos</strong> adicionales.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_activeDefense: {
        txt: {
          es: {
            name: 'Defensa activa',
            short: '',
            desc: 'Durante el próximo turno el personaje se protege y evita hasta <strong>{{attr_tenacity * 1}} puntos</strong> de daño y <strong>{{attr_precision * 1}} puntos</strong> adicionales si resulta crítico. No podrá usarse durante dos turnos consecutivos.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_counterAtk: {
        txt: {
          es: {
            name: 'Actitud de contraataque',
            short: '',
            desc: 'El personaje se mantendrá en pose defensiva hasta su próximo turno. Si recibe un ataque cuerpo a cuerpo y tiene éxito en la tirada, efectuará un ataque que realizará <strong>{{attr_potency * 0.5}} puntos</strong> de daño al objetivo y absorberá <strong>{{attr_tenacity * 0.5}} puntos</strong> de daño recibido. Si resulta crítico, realizará y absorberá <strong>{{attr_precision * 0.5}} puntos</strong> adicionales',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_parasyte: {
        txt: {
          es: {
            name: 'Ataque parasitador',
            short: '',
            desc: 'Realiza <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Además se curará así mismo hasta un máximo de <strong>{{attr_vitality * 0.5}} puntos </strong> de vida, no pudiendo curarse más puntos del daño realizado.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_provoke: {
        txt: {
          es: {
            name: 'Provocar enemigo',
            short: '',
            desc: 'Si tiene éxito, mantendrá la atención del enemigo sobre sí mismo durante los próximos <strong>{{ attr_tenacity / 8 }} turnos</strong> más <strong>{{attr_precision / 8}} turnos</strong> adicionales si resulta crítico.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_interpose: {
        txt: {
          es: {
            name: 'Interceptar ataque',
            short: '',
            desc: 'Se podrá intentar en cualquier momento, sólo una vez por turno y si no se ha realizado una acción antes. Si tiene éxito el personaje podrá interponerse ante la agresión hacia un aliado, recibiendo el ataque y amortiguando hasta <strong>{{attr_potency * 0.5}} puntos</strong> de daño. Si resulta crítico, realizará <strong>{{attr_precision * 0.5}} puntos</strong> de daño adicional.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_control: {
        txt: {
          es: {
            name: 'Efecto de control',
            short: '',
            desc: 'Si tiene éxito, mantendrá inhabilitado hasta un máximo de <strong>{{ attr_tenacity / 8 }} turnos</strong> al objetivo sin que pueda realizar ninguna acción. Si resulta crítico, lo mantendrá inhabilitado <strong>{{attr_precision / 8}} turnos</strong> adicionales.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
      skill_hide: {
        txt: {
          es: {
            name: 'Sigilo',
            short: '',
            desc: 'El personaje se ocultará de la vista de los presentes durante <strong>{{ attr_initiative / 8 }} turnos</strong>. Su próximo ataque le otorgará un dado de ventaja por cada turno que haya estado oculto y descubrirá su posición. El personaje quedará revelado durante un turno, no volviéndose a poder ocultar pasado éste. Si resulta crítico, se mantendrá oculto <strong>{{attr_precision / 8}} turnos</strong> más.',
          },
        },
        calculated: {
          fn: this.calcFns.skillDC,
          template: this.calcTemplates.dc,
        },
        color: null,
      },
    }
  },
  calcFns: {
    /** Obtiene la dificultad a superar en base el valor de una habilidad */
    skillDC: (value: number) => {
      const MULTIPLIER = 8;
      const BASE = 0;

      const appliedValue = value * 2 - 1;
      const percent = 1 - appliedValue / (appliedValue + MULTIPLIER) - BASE;

      const result = Math.round(percent * 20);
      return result;
    },

    /** Obtiene la dificultad a superar en base el valor de una habilidad */
    attrBase: (value: number) => {
      const MULTIPLIER = 30;
      const x = value / MULTIPLIER;
      const result = 1 - Math.pow(1 - x, 3);
      return Math.floor(result * 30);
    },

    /** Obtiene la salud base */
    healthBase: (value: number) => {
      const MULTIPLIER = 30;
      const x = value / MULTIPLIER;
      const result = 1 - Math.pow(1 - x, 3);
      return Math.floor(result * 30) * 3;
    },
  },
  calcTemplates: {
    points: '{{value}} p',
    dc: 'DC {{value}}',
    hp: '{{value}} HP',
  }
};
