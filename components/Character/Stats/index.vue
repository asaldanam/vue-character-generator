<template>
  <div class="CharacterStats">
    <header class="header">
      <div class="header-title u-text-alt">{{ title }}</div>
      <div class="header-count">{{ count }} Puntos</div>
    </header>
    <CharacterStatsItem v-for="stat in statsList" :key="stat.id" :statId="stat.id" />
  </div>
</template>

<script lang="ts">
import _orderBy from 'lodash.orderby';
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

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

    const stats = computed(() => {
      const charStats = Object.entries(character.data?.stats || {});
      const statsByType = charStats.filter(([stat]) => stat.startsWith(statsType.value));
      const statsAsObj = statsByType.map(([id, value]) => ({ id, value }));
      return statsAsObj || [];
    });

    const statsList = computed(() => {
      const statsAsObj = stats.value;
      const statsSorted = _orderBy(statsAsObj, ['value'], ['desc']) as typeof statsAsObj;
      return character.editMode ? statsAsObj : statsSorted;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--theme-layout-x-padding);
  background: var(--theme-color-bg-dark);

  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;

  /* background: var(--theme-color-bg-dark) url('~assets/img/header-bg.webp') repeat-x 80px 0; */
  /* border-bottom: 1px solid var(--theme-color-bg-medium-light); */
  /* box-shadow: 0 7px 21px rgb(0 0 0 / 25%); */

  top: 0;
  z-index: 5;
}

.header-title {
  line-height: 24px;
  text-transform: uppercase;
}

.header-count {
  font-size: 14px;
  text-align: center;
}
</style>
