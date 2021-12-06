<template>
  <div class="root">
    <div v-for="stat in stats" :key="stat.id">
      <CharacterStatsItem :statId="stat.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import _orderBy from 'lodash.orderby';

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
      const statsSorted = _orderBy(statsAsObj, ['value'], ['desc']) as typeof statsAsObj;
      return character.editMode ? statsAsObj : statsSorted;
    });

    return { stats };
  },
});
</script>
