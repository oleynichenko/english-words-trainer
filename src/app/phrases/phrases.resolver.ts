import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {filter, first, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {PhrasesRequested} from './store/phrases.actions';
import {PhrasesState} from './store/phrases.reducers';

export class PhrasesResolver implements Resolve {
  constructor(private store: Store<PhrasesState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectAllPhrases()),
      tap(phrases => {
        if (!phrases) {

          this.store.dispatch(new PhrasesRequested());
        }
      }),
      filter(course => !!course),
      first()
    );
  }
}
