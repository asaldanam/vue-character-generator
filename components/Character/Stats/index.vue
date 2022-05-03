<template>
  <div class="CharacterStats">
    <header class="header u-text-lighted u-bg-dark-glass">
      <div class="header-title u-text-alt">{{ title }}</div>
      <div class="header-count">{{ count }} Puntos invertidos</div>
    </header>
    <CharacterStatsItem v-for="stat in statsList" :key="stat.id" :statId="stat.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import _orderBy from 'lodash.orderby';

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
      return count;
    });

    return { statsList, title: computed(() => txt[statsType.value]), count };
  },
});
</script>
<style lang="scss" scoped>
.CharacterStats {
  margin-bottom: 8px;
  display: contents;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--theme-layout-x-padding);

  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;
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