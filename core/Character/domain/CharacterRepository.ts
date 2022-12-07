import Character from "./Character";

export default interface CharacterRepository {
  save(character: Partial<Character>): void;
  load(slug: string): Character | null;
}
