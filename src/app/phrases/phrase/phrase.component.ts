import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';


import {Phrase} from '../../shared/models/phrase.model';
import {Word} from '../../shared/models/word.model';
import {Store} from '@ngrx/store';
import {selectWords} from '../../store/app.selectors';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.css']
})

export class PhraseComponent implements OnInit, OnDestroy {
  @Input() phrase: Phrase;

  openedPanel: Subject<void> = new Subject<void>();
  wasOpened = false;
  words: Word[] = [];
  subscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(selectWords)
      .subscribe((words) => {
        this.words = words.filter((word) => {
          return this.phrase.words.indexOf(word.id) !== -1;
        });
      });
  }

  makeWordsUnknown() {
    if (!this.wasOpened) {
      this.openedPanel.next();
      // изменить state of words
      this.wasOpened = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
