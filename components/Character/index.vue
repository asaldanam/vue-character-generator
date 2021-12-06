<template>
  <main>
    <CharacterStats :statsType="'attr'" />
    <CharacterStats :statsType="'skill'" />
    <CharacterActions />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const [, { load }] = useCharacterSheet.injectors();
    const { query } = useContext();

    onMounted(() => {
      load((query.value as any)?.character);
    });

    return {};
  },
});
</script>
