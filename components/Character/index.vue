<template>
  <main>
    <CharacterHeader />
    <UiWrapper class="stats">
      <CharacterStats class="attributes" :statsType="'attr'" />
      <CharacterStats class="skills" :statsType="'skill'" />
      <CharacterGear class="gear" />
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
  useRouter,
} from '@nuxtjs/composition-api';
import slugify from 'slugify';
import { useCharacter } from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

export default defineComponent({
  setup() {
    const { editMode } = useEditMode();
    const router = useRouter();
    const [, { load, init }] = useCharacter();
    const { params } = useContext();

    const loadCharacter = async () => {
      const paramName = params.value.name || '';
      const character = await load(slugify(paramName));

      if (!character) {
        init();
      }

      if (paramName && !character) {
        router.push({ path: '/character' });
      }
    }

    onMounted(() => {
      loadCharacter();
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

.gear {
  @media (min-width: 720px) {
    grid-column: 2 / span 2;
  }
}
</style>
