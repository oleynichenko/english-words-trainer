import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AppState} from './app.reducer';
import {AuthState} from '../auth/store/auth.reducer';
import {UIState} from '../shared/ui/ui.reducer';

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

