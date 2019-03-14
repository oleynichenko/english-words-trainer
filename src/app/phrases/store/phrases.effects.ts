import {Effect, Actions, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';

import {PhrasesActionsTypes} from './phrases.actions';
import {DataStorageService} from '../../shared/data-storage.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhrasesEffects {
  constructor(private actions$: Actions,
              private dataStorageService: DataStorageService) {}

  @Effect({dispatch: false})
    loadPhrases$ = this.actions$.pipe(
      ofType(PhrasesActionsTypes.PHRASES_REQUESTED),
      tap(() => this.dataStorageService.getPhrasesFromDb())
      // tap(() => console.log('effect'))
    );
}
