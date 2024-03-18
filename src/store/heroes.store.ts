import { HeroesResponse } from './../app/models/heroes-response.interface';
import { inject } from '@angular/core';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { filter, pipe, switchMap, tap } from 'rxjs';

import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';
import { HeroLocation } from '@models/location.interface';
import { Episode } from '@models/episode.interface';
import { HeroEndpointsChahe } from '@models/hero-endpoints-chahe.interface';

export interface HeroesState {
  heroes: Hero[];
  totalHeroesCount: number;
  isHeroesLoading: boolean;
  allHeroesLocation: Record<number, HeroLocation | null>;
  allHeroesEpisodes: Record<number, Episode[]>;
}

const initialState: HeroesState = {
  heroes: [],
  totalHeroesCount: 0,
  isHeroesLoading: false,
  allHeroesLocation: {},
  allHeroesEpisodes: {},
};

export const HeroesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, heroesService = inject(HeroService)) => ({
    getHeroLocation: rxMethod<HeroEndpointsChahe<string>>(
      pipe(
        filter(({ heroId }) => !store.allHeroesLocation()[heroId]),
        switchMap(({ url, heroId }) =>
          heroesService.getHeroLocation(url).pipe(
            tapResponse({
              next: (heroLocation: HeroLocation) => {
                patchState(store, {
                  allHeroesLocation: { ...store.allHeroesLocation, [heroId]: heroLocation },
                });
              },
              error: console.error,
            }),
          ),
        ),
      ),
    ),
    getHeroEpisodes: rxMethod<HeroEndpointsChahe<string[]>>(
      pipe(
        filter(({ heroId }) => !store.allHeroesEpisodes()[heroId]),
        switchMap(({ url, heroId }) =>
          heroesService.getHeroEpisodes(url).pipe(
            tapResponse({
              next: (episodes: Episode[]) => {
                patchState(store, {
                  allHeroesEpisodes: { ...store.allHeroesEpisodes, [heroId]: episodes },
                });
              },
              error: console.error,
            }),
          ),
        ),
      ),
    ),
    getHeroes: rxMethod(
      pipe(
        switchMap(() =>
          heroesService.getHeroes().pipe(
            tapResponse({
              next: (heroes: Hero[]) => {
                patchState(store, { heroes });
              },
              error: console.error,
            }),
          ),
        ),
      ),
    ),
    getMultipleHeroes: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isHeroesLoading: true })),
        switchMap((page: number) =>
          heroesService.getMultipleHeroes(page).pipe(
            tapResponse({
              next: ({ info, results }: HeroesResponse) => {
                patchState(store, {
                  heroes: results,
                  totalHeroesCount: info.count,
                });
              },
              error: console.error,
              finalize: () => patchState(store, { isHeroesLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
