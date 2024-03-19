import { inject } from '@angular/core';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { delay, filter, pipe, switchMap, tap } from 'rxjs';

import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';
import { HeroLocation } from '@models/location.interface';
import { Episode } from '@models/episode.interface';
import { LoadingStore } from './loading.store';
import { Loadings } from '@enums/loadings.enum';

export interface HeroesState {
  heroes: Hero[];
  allHeroesLocation: Record<number, HeroLocation | null>;
  allHeroesEpisodes: Record<number, Episode[]>;
}

const initialState: HeroesState = {
  heroes: [],
  allHeroesLocation: {},
  allHeroesEpisodes: {},
};

export const HeroesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, heroesService = inject(HeroService), loadStore = inject(LoadingStore)) => ({
    getHeroLocation: rxMethod<{ url: string; heroId: number }>(
      pipe(
        filter(({ heroId }) => !store.allHeroesLocation()[heroId]),
        tap(() => loadStore.addLoading(Loadings.HEROES_LOADING)),
        switchMap(({ url, heroId }) =>
          heroesService.getHeroLocation(url).pipe(
            tapResponse({
              next: (heroLocation: HeroLocation) => {
                patchState(store, {
                  allHeroesLocation: { ...store.allHeroesLocation, [heroId]: heroLocation },
                });
              },
              error: console.error,
              finalize: () => loadStore.removeLoading(Loadings.HEROES_LOADING),
            }),
          ),
        ),
      ),
    ),
    getHeroEpisodes: rxMethod<{ urls: string[]; heroId: number }>(
      pipe(
        filter(({ heroId }) => !store.allHeroesEpisodes()[heroId]),
        switchMap(({ urls, heroId }) =>
          heroesService.getHeroEpisodes(urls).pipe(
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
  })),
);
