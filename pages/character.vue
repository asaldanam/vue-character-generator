<template>
  <div>
    <!-- <div>{{ params.slug }}</div>
    <div>{{ character && character.name }}</div> -->
    <div v-for="stat in statList" :key="stat">
      <CharacterStat :statId="stat" editMode />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, useContext } from '@nuxtjs/composition-api';
import useAccessor from '~/composables/useAccessor';
import { CHARACTER_STATS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const { params } = useContext();
    const { characters } = useAccessor();
    const { detail } = characters;

    onMounted(detail.create);

    return {
      params,
      statList: Object.keys(CHARACTER_STATS),
      character: computed(() => detail.state.data),
    };
  },
});
</script>
