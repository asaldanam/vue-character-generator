import CharacterStoreBuilder from "~/core/Character/infraestructure/CharacterStoreBuilder";
import createStore from "~/shared/libs/createStore";

const characterStore = createStore(CharacterStoreBuilder);

export function useCharacter() {
  return characterStore.injectors();
}

export function useCharacterProvider() {
  return characterStore.providers()
}
