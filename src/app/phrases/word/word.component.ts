import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Word} from '../../shared/models/word.model';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import * as appSelectors from '../../store/app.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})

export class WordComponent implements OnInit, OnDestroy {
  @Input() word: Word;
  @Input() onOpenedPanel: Observable<void>;

  isDisabled: boolean;
  isKnown = true;
  authSubscription: Subscription;
  panelSubscription: Subscription;
  isAuth$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(appSelectors.getIsAuth);

    this.authSubscription = this.isAuth$
      .subscribe((isAuth) => {
        this.isDisabled = !isAuth;
      });

    this.panelSubscription = this.onOpenedPanel.pipe(take(1))
      .subscribe(() => {
        this.isKnown = false;
      });
  }

  onChipClick() {
    if (!this.isDisabled) {
      this.isKnown = !this.isKnown;
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.panelSubscription.unsubscribe();
  }
}
