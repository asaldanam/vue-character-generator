import { Stats } from '../../Stats/Stats'
import uuid from '~/shared/utils/uuid';

export default interface Item {
  id: string;
  stats: Partial<Stats>;
  description: string;
  tooltip: string;
}

export function createItem(item: Pick<Item, 'stats' | 'description'> & Partial<Item>): Item {
  return {
    id: item.id || uuid(),
    stats: item.stats,
    description: item.description,
    tooltip: item.tooltip || 'fallback',
  }
}
