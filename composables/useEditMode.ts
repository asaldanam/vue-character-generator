import { computed, useRoute, useRouter } from '@nuxtjs/composition-api';

const KEY = 'edit'

export function useEditMode() {
  const route = useRoute();
  const router = useRouter();

  const setEditMode = (value) => {
    router.push({ query: { [KEY]: value ? 'true' : undefined } })
  }

  return {
    editMode: computed(() => route.value.query[KEY] === 'true' || !route.value.params.name),
    setEditMode
  };
}
