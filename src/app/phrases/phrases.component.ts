import {Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {DataStorageService} from '../shared/data-storage.service';
import {Phrase} from '../shared/models/phrase.model';
import {PhrasesRequested} from './store/phrases.actions';
import {selectAllPhrases} from '../store/app.selectors';
import {AppState} from '../store/app.reducer';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {
  phrases$: Observable<Phrase[]>;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.phrases$ = this.store.select(selectAllPhrases);
  }

  getNextPhrases() {
    this.store.dispatch(new PhrasesRequested());
  }
}
