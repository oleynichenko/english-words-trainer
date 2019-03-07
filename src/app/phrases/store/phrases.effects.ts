import {Effect, Actions, ofType} from '@ngrx/effects';
import {PhrasesActionsTypes} from './phrases.actions';

export class PhrasesEffects {
  constructor(private actions$: Actions) {}

  @Effect()
    loadPhrases$ = this.actions$.pipe(
      ofType(PhrasesActionsTypes.PHRASES_REQUESTED),

    );
}
