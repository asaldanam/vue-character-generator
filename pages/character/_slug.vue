<template>
  <div>
    <!-- <div>{{ params.slug }}</div>
    <div>{{ character && character.name }}</div> -->
    <!-- <CharacterStat :statId="'skill_melee1HAtk'" editMode /> -->
    <div v-for="stat in statList" :key="stat">
      <CharacterStat :statId="stat" editMode />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, useContext } from '@nuxtjs/composition-api';
import useAccessor from '~/composables/useAccessor';
import { CHARACTER_STATS } from '~/models/character/constants';

export default defineComponent({
  setup() {
    const { params } = useContext();
    const { characters } = useAccessor();
    const { detail } = characters;

    onMounted(() => {
      detail.fetch({ id: params.value.slug });
    });

    return {
      params,
      statList: Object.keys(CHARACTER_STATS),
      character: computed(() => detail.state.data),
    };
  },
});
</script>
