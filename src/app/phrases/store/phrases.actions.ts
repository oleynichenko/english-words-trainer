import {Action} from '@ngrx/store';
import {Phrase} from '../../shared/models/phrase.model';
import {Word} from '../../shared/models/word.model';

export enum PhrasesActionsTypes {
  PHRASES_REQUESTED = '[Phrases] Phrases Requested',
  PHRASES_LOADED = '[Phrases] Phrases Loaded',
  PHRASES_IDS_LOADED = '[Phrases] Phrases Ids Loaded',
  WORDS_LOADED = '[Phrases] Words Loaded',
}

export class PhrasesRequested implements Action {
  readonly type = PhrasesActionsTypes.PHRASES_REQUESTED;

  constructor() {}
}

export class PhrasesLoaded implements Action {
  readonly type = PhrasesActionsTypes.PHRASES_LOADED;

  constructor(public payload: Phrase[]) {}
}

export class WordsLoaded implements Action {
  readonly type = PhrasesActionsTypes.WORDS_LOADED;

  constructor(public payload: Word[]) {}
}

export class PhrasesIdsLoaded implements Action {
  readonly type = PhrasesActionsTypes.PHRASES_IDS_LOADED;

  constructor(public payload: string[]) {}
}

export type PhrasesActions =
  PhrasesRequested
  | PhrasesLoaded
  | PhrasesIdsLoaded
  | WordsLoaded;
