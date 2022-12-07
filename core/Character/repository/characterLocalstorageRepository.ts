/* eslint-disable no-console */
/* eslint-disable require-await */
import slugify from "slugify";
import Character, { createCharacter } from "../domain/Character";
import CharacterRepository from "../domain/CharacterRepository";

const characterLocalstorageRepository: CharacterRepository = {
  async load(slug) {
    try {
      if (!slug) return null;

      const characters = loadCharactersStorage();
      const data = characters[slug];

      if (!data) throw new Error('Character not found');
      if (!data.info.name) throw new Error(`Invalid character stored data for ${slug}`);

      const character = createCharacter(data);
      return character;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async save(character) {
    try {
      if (!character.info?.name) throw new Error('Name needed for saving');
      const name = slugify(character.info.name.toLowerCase());
      updateCharactersStorage(name, character);
    } catch (e) {
      console.error(e);
    }
  },
}

export default characterLocalstorageRepository;


/** Private */

const KEY = 'characters'

function updateCharactersStorage(name: string, character: Partial<Character>) {
  const characters = loadCharactersStorage();
  const updatedStorage = {
    ...characters,
    [name]: character,
  };

  localStorage.setItem(KEY, JSON.stringify(updatedStorage));
}

function loadCharactersStorage() {
  const charactersStr = localStorage.getItem(KEY);
  if (!charactersStr) return {};

  const characters = JSON.parse(charactersStr);

  return characters || {};
}



