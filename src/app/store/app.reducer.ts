import {ActionReducerMap} from '@ngrx/store';

import {AuthState, authReducer} from '../auth/store/auth.reducer';
import {UIState, uiReducer} from '../shared/ui/ui.reducer';
import {phrasesReducers, PhrasesState} from '../phrases/store/phrases.reducers';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  phrases: PhrasesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  phrases: phrasesReducers
};
