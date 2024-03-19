import { Signal, computed, inject } from '@angular/core';

import { LoadingStore } from '@store/loading.store';

export const getLoading = (loadings: string[]): Signal<boolean> => {
  const loadingsStore = inject(LoadingStore);

  return computed<boolean>(() => {
    return loadings.every((el) => loadingsStore.loadings().includes(el));
  });
};
