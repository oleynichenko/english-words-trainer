import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {PhrasesActions, PhrasesActionsTypes} from './phrases.actions';
import {Phrase} from '../../shared/models/phrase.model';

export interface PhrasesState extends EntityState<Phrase> {

}

export const adapter: EntityAdapter<Phrase> =
  createEntityAdapter<Phrase>();


export const initialPhrasesState: PhrasesState = adapter.getInitialState({
});

export function phrasesReducers(state = initialPhrasesState, action: PhrasesActions) {
  switch (action.type) {
    case PhrasesActionsTypes.PHRASES_LOADED:
      return adapter.addAll(action.payload, {...state});

    default:
      return state;
  }
}

export const selectAllPhrases = createSelector(
  selectCoursesState,
  fromCourse.selectAll

);
