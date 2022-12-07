import Character, { createCharacter } from "../domain/Character";
import CharacterRepository from "../domain/CharacterRepository";
import { Stat, Stats, StatValue } from "../domain/Stats/Stats";
import characterLocalstorageRepository from "../repository/characterLocalstorageRepository";
import validateStat from "./usecases/validateStat";
import validateStats from "./usecases/validateStats";

const initialState = {
  character: createCharacter(),
}

export default function CharacterStore(state: typeof initialState) {
  return createCharacterStore(state, characterLocalstorageRepository)
}

function createCharacterStore(
  state = initialState,
  repository: CharacterRepository,
) {
  /** Carga la información del personaje */
  const load = (slug: string) => {
    const loadedCharacter = repository.load(slug);
    if (!loadedCharacter) return;

    state.character = loadedCharacter;

    return loadedCharacter;
  };

  /** Actualiza la información del personaje */
  const save = () => {
    repository.save(state.character);
  }

  /** Inicializa el personaje */
  const setData = (characterInput: Partial<Character>) => {
    state.character = createCharacter(characterInput)
  }

  /** Actualiza múltiples estadísticas */
  const setStats = (stats: Stats, mode: 'set' | 'update' = 'set') => {
    validateStats(stats);

    if (mode === 'set') state.character.stats = stats;
    if (mode === 'update') state.character.stats = { ...state.character.stats, ...stats };
  }

  /** Actualiza una estadística al valor indicado */
  const setStatValue = (stat: Stat, value: StatValue) => {
    validateStat(stat, value);

    state.character.stats[stat as string] = value;
  }

  /** Incrementa en 1 una estadística */
  const upStatValue = (stat: Stat) => {
    const newValue = ((state.character.stats || {})[stat] || 0) + 1;

    setStatValue(stat, newValue);
  }

  /** Reduce en 1 una estadística */
  const downStatValue = (stat: Stat) => {
    const newValue = ((state.character.stats || {})[stat] || 0) - 1;

    setStatValue(stat, newValue);
  }

  /** Actualiza el estado del personaje */
  const updateState = (nextState: Partial<Character['state']>) => {
    const prevState = state.character.state;

    state.character.state = { ...prevState, ...nextState };
  }

  /** Actualiza la información del personaje */
  const updateInfo = (nextInfo: Partial<Character['info']>) => {
    const prevInfo = state.character.info;

    state.character.info = { ...prevInfo, ...nextInfo };
  }

  return {
    state,
    actions: {
      load,
      save,
      setData,
      setStats,
      setStatValue,
      upStatValue,
      downStatValue,
      updateState,
      updateInfo,
    }
  }
}
