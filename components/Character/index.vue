<template>
  <main>
    <CharacterHeader />
    <CharacterStats :statsType="'attr'" />
    <CharacterStats :statsType="'skill'" />
    <CharacterActions />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import Character from '~/pages/character.vue';

export default defineComponent({
  setup() {
    const [, { load }] = useCharacterSheet.injectors();
    const { query } = useContext();
    onMounted(() => {
      load((query.value as any)?.character);
    });
    return {};
  },
  components: { Character },
});
</script>
