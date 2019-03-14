import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {filter, first, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {PhrasesRequested} from './store/phrases.actions';
import {PhrasesState} from './store/phrases.reducers';
import {Phrase} from '../shared/models/phrase.model';
import {Injectable} from '@angular/core';
import {selectAllPhrases} from '../store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class PhrasesResolver implements Resolve<Phrase[]> {
  constructor(private store: Store<PhrasesState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectAllPhrases),
      tap(phrases => {
        if (phrases.length === 0) {
          this.store.dispatch(new PhrasesRequested());
        }
      }),
      filter(phrase => !!phrase),
      first()
    );
  }
}
