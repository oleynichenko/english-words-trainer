import {UIActions, UIActionTypes} from './ui.actions';

export interface  UIState {
  isLoading: boolean;
}

const initialState:  UIState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case UIActionTypes.START_LOADING:
      return {
        isLoading: true
      };

    case UIActionTypes.STOP_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
