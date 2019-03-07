import {ActionReducerMap} from '@ngrx/store';

import {AuthState, authReducer} from '../auth/store/auth.reducer';
import {UIState, uiReducer} from '../shared/ui/ui.reducer';

export interface AppState {
  auth: AuthState;
  ui: UIState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer
};
