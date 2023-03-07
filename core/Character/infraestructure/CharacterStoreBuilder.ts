import { CharacterStore, CharacterStoreState } from "../application/CharacterStore";
import characterLocalstorageRepository from "./repository/characterLocalstorageRepository";

export default function CharacterStoreBuilder(state: CharacterStoreState) {
  return CharacterStore(state, characterLocalstorageRepository)
}
