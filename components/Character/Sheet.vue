<template>
  <div>
    <div v-for="stat in statList" :key="stat">
      <CharacterStat :statId="stat" editMode />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterSheet';
import { CHARACTER_STATS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const [character, characterActions] = useCharacterSheet.injectors();

    onMounted(characterActions.create);

    return {
      statList: Object.keys(CHARACTER_STATS),
      character,
    };
  },
});
</script>
