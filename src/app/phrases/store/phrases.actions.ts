import {Action} from '@ngrx/store';
import {Phrase} from '../../shared/models/phrase.model';

export enum PhrasesActionsTypes {
  PHRASES_REQUESTED = '[Phrases] Phrases Requested',
  PHRASES_LOADED = '[Phrases] Phrases Loaded'
}

export class PhrasesRequested implements Action {
  readonly type = PhrasesActionsTypes.PHRASES_REQUESTED;

  constructor(public payload: string[]) {}
}

export class PhrasesLoaded implements Action {
  readonly type = PhrasesActionsTypes.PHRASES_LOADED;

  constructor(public payload: Phrase[]) {}
}

export type PhrasesActions = PhrasesRequested | PhrasesLoaded;
