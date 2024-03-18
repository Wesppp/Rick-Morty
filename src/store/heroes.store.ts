import { inject } from '@angular/core';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { delay, filter, pipe, switchMap } from 'rxjs';

import { Hero } from '@models/hero.interface';
import { HeroService } from '@services/hero.service';
import { HeroLocation } from '@models/location.interface';

export interface HeroesState {
  heroes: Hero[];
  allHeroesLocation: Record<number, HeroLocation | null>;
}

const initialState: HeroesState = {
  heroes: [],
  allHeroesLocation: {},
};

export const HeroesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, heroesService = inject(HeroService)) => ({
    getHeroLocation: rxMethod<{ url: string; heroId: number }>(
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
  })),
);
