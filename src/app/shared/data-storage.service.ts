import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {Word} from './models/word.model';
import {Phrase} from './models/phrase.model';
import {Subject, zip} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
phrasesChanged = new Subject<Phrase[]>();
wordsChanged = new Subject<Word[]>();

  phrasesNumber = 5;
  phrasesIds = [];

  static getUnique(arr) {
    return arr.reduce((resArr, id) => {
      if (resArr.indexOf(id) === -1) {
        resArr.push(id);
      }

      return resArr;
    }, []);
  }
  // get q numbers from 0 to range (not incliding range)
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

  constructor(private db: AngularFirestore) {}

  public getPhrasesFromDb() {
    if (this.phrasesIds.length === 0) {
      this.db.collection('phrases').snapshotChanges().pipe(
        map((items) => {
          const ids = [];

          items.forEach(function (item: any) {
            ids.push(item.payload.doc.id);
          });

          return ids;
        }),
        take(1)
      )
      .subscribe((ids) => {
        this.phrasesIds = ids;
        this.queryPhrases();
      });
    } else {
      this.queryPhrases();
    }
  }

  private queryPhrases() {
    zip(...this.formPhrasesQueries(this.phrasesIds, this.phrasesNumber))
      .pipe(
        take(1)
      )
      .subscribe((phrases: any) => {
        this.phrasesChanged.next(phrases);
        this.getWords(phrases);
      });
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
        this.wordsChanged.next(words);
      });
  }

  public formPhrasesQueries(idsData, q) {
    const randomIndexes = DataStorageService.getRandomNumbers(q, idsData.length);

    return randomIndexes.map((index) => {
      return this.db.collection('phrases').doc(idsData[index]).valueChanges();
    });
  }
}
