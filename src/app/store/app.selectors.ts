import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AppState} from './app.reducer';
import {AuthState} from '../auth/store/auth.reducer';
import {UIState} from '../shared/ui/ui.reducer';
import {PhrasesState, selectors} from '../phrases/store/phrases.reducers';

export const selectAuth = createFeatureSelector<AppState, AuthState>('auth');

export const getIsAuth = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
);

export const selectUi = createFeatureSelector<AppState, UIState>('ui');

export const getIsLoading = createSelector(
  selectUi,
  (state: UIState) => state.isLoading
);


export const selectPhrasesState = createFeatureSelector<PhrasesState>('phrases');

export const selectAllPhrases = createSelector(
  selectPhrasesState,
  selectors.selectAll
);

export const selectPhrasesIds = createSelector(
  selectPhrasesState,
  (state: PhrasesState) => state.phrasesIds
);

export const selectWords = createSelector(
  selectPhrasesState,
  (state: PhrasesState) => state.words
);
