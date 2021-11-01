<template>
  <div>
    {{test}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useAccessor from '~/composables/useAccessor';

export default defineComponent({
  setup() {
    const store = useAccessor();
    const test = computed(() => store.characters.fullName);

    return {
      test
    }
  },
})
</script>
