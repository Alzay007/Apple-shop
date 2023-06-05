import { SortType } from '../types/SortType';
import { Product } from '../types/Product';

export function sortItems(itemsList: Product[], sortBy: SortType) {
  return itemsList.sort((a, b) => {
    switch (sortBy) {
      case SortType.LOW:
        return a.fullPrice - b.fullPrice;

      case SortType.HIGH: {
        return b.fullPrice - a.fullPrice;
      }

      case SortType.RATING: {
        return b.rating - a.rating;
      }

      default:
        return +a.id - +b.id;
    }
  });
}
