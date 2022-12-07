import CharacterStore from "~/core/Character/application/CharacterStore";
import { useStore } from "~/shared/libs/useStore";

const characterStore = useStore(CharacterStore);

export function useCharacter() {
  return characterStore.injectors();
}

export function useCharacterProvider() {
  return characterStore.providers()
}
