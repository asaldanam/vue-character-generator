<template>
  <div>
    <div v-for="attr in attrs" :key="attr">
      <CharacterStat :statId="attr" editMode />
    </div>
    ----------------------------
    <div v-for="skill in skills" :key="skill">
      <CharacterStat :statId="skill" editMode />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterSheet';
import { CHARACTER_STATS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const [character, { create }] = useCharacterSheet.injectors();

    onMounted(create);
    const stats = Object.keys(CHARACTER_STATS);
    const attrs = stats.filter((stat) => stat.startsWith('attr_'));
    const skills = stats.filter((stat) => stat.startsWith('skill_'));

    return {
      attrs,
      skills,
      character,
    };
  },
});
</script>
