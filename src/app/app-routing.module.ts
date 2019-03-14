import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhrasesComponent} from './phrases/phrases.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {PhrasesResolver} from './phrases/phrases.resolver';

const routes: Routes = [
  {path: '', component: PhrasesComponent,  resolve: {phrases: PhrasesResolver}},
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
