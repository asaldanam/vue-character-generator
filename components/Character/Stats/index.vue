<template>
  <div class="CharacterStats">
    <header class="header">
      <div class="content">
        <div class="header-title u-text-alt">{{ title }}</div>
        <div class="header-count">{{ count }} Puntos</div>
      </div>
    </header>
    <div v-if="editMode" class="stats-tutorial">
      <div v-if="statsType === 'attr'">
        <p>Representan las capacidades innatas del personaje.</p>
        <p>Determinan parámetros como la salud o su capacidad para evitar el daño, también los efectos provocados por las habilidades como la cantidad daño o sanación que realizan cuando tienen éxito.</p>
        <p>Aumentar los efectos que produce un atributo será más costoso cuanto más puntos se inviertan en él.</p>
      </div>
      <div v-if="statsType === 'skill'">
        <p>Representan las competencias adquiridas del personaje.</p>
        <p>Pueden realizarse como acciones dentro del turno, su éxito o fallo depende de superar la Dificultad de Clase (DC) indicada en la habilidad, la cual será más sencilla de superar cuanta más maestría se tenga la habilidad. Cada habilidad dispone de una descripción que indica los efectos que produce y qué atributos están asociados a ellos.</p>
        <p>Disminuir la dificultad de una habilidad será más costoso cuantos más puntos se hayan invertido en ella.</p>
      </div>
    </div>
    <div class="stats-container">
      <CharacterStatsItem
        v-for="stat in statsList"
        :key="stat.id"
        :stat-id="stat.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import _orderBy from 'lodash.orderby';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

const txt = {
  attr: 'Atributos',
  skill: 'Habilidades',
};

export default defineComponent({
  props: {
    statsType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { statsType } = toRefs(props);
    const [character] = useCharacterSheet.injectors();
    const { editMode } = useEditMode();

    const stats = computed(() => {
      const charStats = Object.entries(character.data?.stats || {});
      const statsByType = charStats.filter(([stat]) => stat.startsWith(statsType.value));
      const statsAsObj = statsByType.map(([id, value]) => ({ id, value }));
      return statsAsObj || [];
    });

    const statsList = computed(() => {
      const statsAsObj = stats.value;
      const statsSorted = _orderBy(statsAsObj, ['value'], ['desc']) as typeof statsAsObj;
      return editMode.value ? statsAsObj : statsSorted;
    });

    const count = computed(() => {
      const count = stats.value.reduce((counter, stat) => {
        return counter + (stat.value as number || 0);
      }, 0);
      return count - stats.value.length;
    });

    return {
      statsList,
      title: computed(() => txt[statsType.value]),
      count,
      editMode,
    };
  },
});
</script>
<style lang="scss" scoped>
/* .CharacterStats {
  padding-bottom: 16px;
} */

.header {
  background: var(--theme-color-bg-dark);
  /* color: var(--theme-color-accent); */

  margin-left: -16px;
  margin-right: -16px;
  padding: 16px;

  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;

  /* background: var(--theme-color-bg-dark) url('~assets/img/header-bg.webp') repeat-x 80px 0; */

  top: 0;
  z-index: 5;

  @media (min-width: 720px) {
    margin: 0;
    padding-left: 0;
    /* box-shadow: 0 7px 21px rgb(0 0 0 / 25%); */
    padding-right: 0;
    border-bottom: 1px solid var(--theme-color-bg-light);
    background: var(--theme-color-bg-medium);
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  line-height: 24px;
  text-transform: uppercase;
}

.header-count {
  /* font-size: 14px; */
  text-align: center;
}

.stats-container {
  @media (min-width: 720px) {
    --gap: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: var(--gap);
    padding-top: var(--gap);
    padding-bottom: var(--gap);
  }
}

.stats-tutorial {
  padding: 0px 16px 16px;
  font-size: 14px;
  font-style: italic;
  background: var(--theme-color-bg-dark);
  margin: 0 -16px;

  @media (min-width: 720px) {
    padding: 16px;
    margin: 0px;
  }

  p {
    margin: 0 0 6px;
  }
}
</style>
