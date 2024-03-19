import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { Loadings } from '@enums/loadings.enum';

export interface LoadingState {
  loadings: string[];
}

export const initialState: LoadingState = {
  loadings: [],
};

export const LoadingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addLoading(loading: Loadings): void {
      patchState(store, { loadings: [loading, ...store.loadings()] });
    },
    removeLoading(loading: Loadings): void {
      patchState(store, { loadings: store.loadings().filter(el => el !== loading) });
    },
  })),
);
