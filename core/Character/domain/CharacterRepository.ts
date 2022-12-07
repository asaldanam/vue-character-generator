import Character from "./Character";

export default interface CharacterRepository {
  save(character: Partial<Character>): Promise<void>;
  load(slug: string): Promise<Character | null>;
}
