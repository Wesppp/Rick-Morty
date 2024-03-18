import { Hero } from './hero.interface';

export interface HeroesResponse {
  info: {
    count: number;
    page: number;
    next: string;
    prev: null;
  };
  results: Hero[];
}
