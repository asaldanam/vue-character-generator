<template>
  <main>
    <CharacterHeader />
    <UiWrapper class="stats">
      <CharacterStats class="attributes" :statsType="'attr'" />
      <CharacterStats class="skills" :statsType="'skill'" />
    </UiWrapper>
    <UiFooter>
      <CharacterActions v-if="editMode" />
      <CharacterHealthbar v-if="!editMode" />
    </UiFooter>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

export default defineComponent({
  setup() {
    const { editMode } = useEditMode();
    const router = useRouter();
    const route = useRoute();
    const [, { load }] = useCharacterSheet.injectors();
    const { params } = useContext();

    onMounted(() => {
      console.log(route.value.matched[0].path);
      const name = params.value.name?.toLocaleLowerCase();
      const character = load(name);

      if (name && !character) {
        router.push({ path: '/character' });
      }
    });

    return { editMode };
  },
});
</script>
<style lang="scss" scoped>
.stats {
  @media (min-width: 720px) {
    display: grid;
    padding-top: 16px;
    grid-gap: 48px;
    grid-template-columns: repeat(3, 1fr);
  }
}

.skills {
  @media (min-width: 720px) {
    grid-column: span 2;
  }
}
</style>
