import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhrasesComponent} from './phrases/phrases.component';
import {DictionaryComponent} from './dictionary/dictionary.component';

const routes: Routes = [
  {path: '', component: PhrasesComponent},
  {path: 'dictionary', component: DictionaryComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
