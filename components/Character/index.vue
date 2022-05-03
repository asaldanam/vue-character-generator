<template>
  <main>
    <CharacterHeader />
    <CharacterStats :statsType="'attr'" />
    <CharacterStats :statsType="'skill'" />
    <CharacterActions />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext, useRoute } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import Character from '~/pages/character/_name.vue';

export default defineComponent({
  setup() {
    const router = useRoute();
    const [, { load }] = useCharacterSheet.injectors();
    const { params } = useContext();

    onMounted(() => {
      load(params.value.name);
    });

    return {};
  },
  components: { Character },
});
</script>
