<template>
  <div class="CharacterStats">
    <header class="header">
      <div class="header-title">{{ title }}</div>
      <div class="header-count">{{ count }} Puntos invertidos</div>
    </header>
    <div v-for="stat in statsList" :key="stat.id">
      <CharacterStatsItem :statId="stat.id" />
    </div>
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
      const count = stats.value.reduce((counter, { value }) => {
        return counter + value;
      }, 0);
      return count;
    });

    return { statsList, title: computed(() => txt[statsType.value]), count };
  },
});
</script>
<style lang="scss" scoped>
.CharacterStats {
  margin-bottom: 32px;
}
.header {
  padding: 10px 16px;
  background: var(--theme-color-bg-light);
}

.header-title {
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
}

.header-count {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: var(--theme-color-primary);
}
</style>