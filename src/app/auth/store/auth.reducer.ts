import {AuthActions, AuthActionTypes} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };

    case AuthActionTypes.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
}
