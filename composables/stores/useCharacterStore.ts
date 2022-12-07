import CharacterStore from "~/core/Character/application/CharacterStore";
import createStore from "~/shared/libs/createStore";

const characterStore = createStore(CharacterStore);

export function useCharacter() {
  return characterStore.injectors();
}

export function useCharacterProvider() {
  return characterStore.providers()
}
