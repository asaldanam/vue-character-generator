<template>
  <main>
    <CharacterHeader />
    <CharacterStats :statsType="'attr'" />
    <CharacterStats :statsType="'skill'" />
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
