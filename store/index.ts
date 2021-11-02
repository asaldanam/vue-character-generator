import { getAccessorType } from 'typed-vuex';

// Import all your submodules
import * as charactersList from '~/store/characters/list';
import * as charactersDetail from '~/store/characters/detail';

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// ...

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    characters: {
      namespaced: true,
      modules: {
        list: charactersList,
        detail: charactersDetail,
      },
    },
  },
});
