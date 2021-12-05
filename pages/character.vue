<template>
  <CharacterSheet />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import useCharaterSheet from '~/composables/useCharacterSheet';

export default defineComponent({
  setup() {
    useCharaterSheet.providers();
  },
});
</script>
