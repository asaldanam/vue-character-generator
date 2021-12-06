<template>
  <div class="root">
    <div v-for="stat in stats" :key="stat">
      <CharacterStatsItem :statId="stat" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import { CHARACTER_STATS } from '~/models/character/stats';

export default defineComponent({
  props: {
    statsType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { statsType } = toRefs(props);
    const statKeys = Object.keys(CHARACTER_STATS);
    const stats = computed(() => statKeys?.filter((s) => s.startsWith(statsType.value)));
    return { stats };
  },
});
</script>
