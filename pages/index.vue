<template>
  <div>
    <a href="/character">/character</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const router = useRouter();

    onMounted(() => {
      router.push('/character');
    });
  },
});
</script>
