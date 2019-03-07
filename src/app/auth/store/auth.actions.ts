import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTHENTICATED = '[Auth] Set Authenticated',
  SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated'
}

export class SetAuthenticated implements Action {
  readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
