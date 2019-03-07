import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Phrase} from '../shared/models/phrase.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {
  phrases$: Observable<Phrase[]>;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getPhrasesFromDb();
    this.phrases$ = this.dataStorageService.phrasesChanged;
  }

  getNextPhrases() {
    this.dataStorageService.getPhrasesFromDb();
  }
}
