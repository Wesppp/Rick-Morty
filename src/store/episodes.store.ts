import { inject } from '@angular/core';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';

import { Episode } from '@models/episode.interface';
import { Hero } from '@models/hero.interface';
import { EpisodesService } from '@services/episodes.service'; 'rxjs';
import { ChachedData } from '@models/chached-urls.interface';
import { filter, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export interface EpisodesState {
  episodes: Episode[];
  allEpisodesHeroes: Record<number, Hero[]>;
}

const initialState: EpisodesState = {
  episodes: [],
  allEpisodesHeroes: {},
};

export const EpisodesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, episodesService = inject(EpisodesService)) => ({
    getEpisodeHeroes: rxMethod<ChachedData<string[]>>(
      pipe(
        filter(({ id }) => !store.allEpisodesHeroes()[id]),
        switchMap(({ id, urls }) =>
          episodesService.getEpisodeHeroes(urls).pipe(
            tapResponse({
              next: (heroes: Hero[]) => {
                patchState(store, {
                  allEpisodesHeroes: { ...store.allEpisodesHeroes, [id]: heroes },
                });
              },
              error: console.error,
            }),
          )
        )
      )
    )
  })),
);
