<template>
  <div class="CharacterStats">
    <header class="header">
      <div class="content">
        <div class="header-title u-text-alt">{{ title }}</div>
        <div class="header-count">{{ count }} Puntos</div>
      </div>
    </header>
    <div class="stats-container">
      <CharacterStatsItem v-for="stat in statsList" :key="stat.id" :statId="stat.id" />
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
        return counter + (stat.value || 0);
      }, 0);
      return count - stats.value.length;
    });

    return { statsList, title: computed(() => txt[statsType.value]), count };
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

  margin-left: -24px;
  margin-right: -24px;
  padding: 16px 24px;

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
</style>
