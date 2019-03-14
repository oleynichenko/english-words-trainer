import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {zip} from 'rxjs';
import {filter, first, map, switchMap, take, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {Phrase} from './models/phrase.model';
import {PhrasesIdsLoaded, PhrasesLoaded, WordsLoaded} from '../phrases/store/phrases.actions';
import {selectPhrasesIds} from '../store/app.selectors';
import {AppState} from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  phrasesNumber = 5;

  static getUnique(arr) {
    return arr.reduce((resArr, id) => {
      if (resArr.indexOf(id) === -1) {
        resArr.push(id);
      }

      return resArr;
    }, []);
  }

  // get q numbers from 0 to range (not including range)
  static getRandomNumbers(q, range) {
    const numbers = [];

    while (numbers.length < q) {
      const randomNumber = Math.floor(Math.random() * range);

      if (numbers.indexOf(randomNumber) === -1) {
        numbers.push(randomNumber);
      }
    }

    return numbers;
  }

  constructor(private db: AngularFirestore,
              private store: Store<AppState>) {}

  public getPhrasesFromDb() {
    this.store.select(selectPhrasesIds).pipe(
      tap(phrasesIds => {
        if (phrasesIds.length === 0) {
          this.queryPhrasesIds().subscribe((ids) => {
            this.store.dispatch(new PhrasesIdsLoaded(ids));
          });
        }
      }),
      filter(phrasesIds => phrasesIds.length !== 0),
      switchMap((phrasesIds) => {
        return zip(...this.formPhrasesQueries(phrasesIds, this.phrasesNumber));
      }),
      first()
    ).subscribe((phrases: Phrase[]) => {
      this.store.dispatch(new PhrasesLoaded(phrases));
      this.getWords(phrases);
    });
  }

  private queryPhrasesIds() {
    return this.db.collection('phrases').snapshotChanges().pipe(
      map((items) => {
        const ids = [];

        items.forEach(function (item: any) {
          ids.push(item.payload.doc.id);
        });

        return ids;
      }),
      first()
    );
  }

  getWords(phrases) {
    const ids = phrases.reduce((res, phrase) => [...res, ...phrase.words], []);
    const uniqueIds = DataStorageService.getUnique(ids);

    const idQueries = [];

    uniqueIds.forEach((id) => {
      idQueries.push(this.db.collection(
        'words',
        ref => ref.where('id', '==', id)
      ).valueChanges());
    });

    zip(...idQueries)
      .pipe(
        take(1),
        map((wordsArr) => {
          return wordsArr.map(item => item[0]);
        })
      )
      .subscribe(words => {
        this.store.dispatch(new WordsLoaded(words));
      });
  }

  public formPhrasesQueries(idsData, q) {
    const randomIndexes = DataStorageService.getRandomNumbers(q, idsData.length);

    return randomIndexes.map((index) => {
      return this.db.collection('phrases').doc(idsData[index]).valueChanges();
    });
  }
}
