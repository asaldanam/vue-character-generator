<template>
  <main>
    <div v-for="attr in attrs" :key="attr">
      <CharacterStat :statId="attr" editMode />
    </div>
    <div v-for="skill in skills" :key="skill">
      <CharacterStat :statId="skill" editMode />
    </div>
    <CharacterActions />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext, useRoute } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { CHARACTER_STATS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const [character, { load }] = useCharacterSheet.injectors();
    const { query } = useContext();

    const stats = Object.keys(CHARACTER_STATS);
    const attrs = stats.filter((stat) => stat.startsWith('attr_'));
    const skills = stats.filter((stat) => stat.startsWith('skill_'));

    onMounted(() => {
      load((query.value as any)?.character);
    });

    return {
      attrs,
      skills,
      character,
    };
  },
});
</script>
