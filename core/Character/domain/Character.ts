import { Stats, createStats } from "./Stats/Stats";
import uuid from "~/shared/utils/uuid";

export default interface Character {
  id: string;
  info: {
    name: string;
    title: string;
    avatar?: string;
  };
  state: {
    currentHealth: number;
    currentBarrier: number;
  };
  stats: Stats;
};

export function createCharacter(character?: Partial<Character>): Character {
  return {
    id: character?.id || uuid(),
    info: {
      name: character?.info?.name || '',
      title: character?.info?.title || '',
      avatar: character?.info?.avatar || '',
    },
    state: {
      currentHealth: character?.state?.currentHealth || 0,
      currentBarrier: character?.state?.currentBarrier || 0,
    },
    stats: createStats(character?.stats),
  }
}
