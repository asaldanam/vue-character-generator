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
  computed,
  defineComponent,
  onMounted,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import Character from '~/pages/character/_name.vue';

export default defineComponent({
  setup() {
    const router = useRoute();
    const [character, { load }] = useCharacterSheet.injectors();
    const editMode = computed(() => character?.editMode);
    const { params } = useContext();

    onMounted(() => {
      load(params.value.name);
    });

    return { editMode };
  },
  components: { Character },
});
</script>
