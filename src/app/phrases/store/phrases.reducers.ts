import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {PhrasesActions, PhrasesActionsTypes} from './phrases.actions';
import {Phrase} from '../../shared/models/phrase.model';
import {Word} from '../../shared/models/word.model';

export interface PhrasesState extends EntityState<Phrase> {
  phrasesIds: string[];
  words: Word[];
}

export const adapter: EntityAdapter<Phrase> =
  createEntityAdapter<Phrase>();

export const initialPhrasesState: PhrasesState = adapter.getInitialState({
  phrasesIds: [],
  words: []
});

export function phrasesReducers(state = initialPhrasesState, action: PhrasesActions) {
  switch (action.type) {
    case PhrasesActionsTypes.PHRASES_LOADED:
      return adapter.addAll(action.payload, {...state});

    case PhrasesActionsTypes.WORDS_LOADED:
      return {
        ...state,
        words: [...action.payload]
      };

    case PhrasesActionsTypes.PHRASES_IDS_LOADED:
      return {
        ...state,
        phrasesIds: [...action.payload]
      };

    default:
      return state;
  }
}

export const selectors = adapter.getSelectors();
