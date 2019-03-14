import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PhrasesComponent } from './phrases/phrases.component';
import { PhraseComponent } from './phrases/phrase/phrase.component';
import { WordComponent } from './phrases/word/word.component';
import { environment } from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import { DictionaryComponent } from './dictionary/dictionary.component';
import {AuthModule} from './auth/auth.module';
import {appReducers} from './store/app.reducer';
import {AuthService} from './auth/auth.service';
import {UiService} from './shared/ui/ui.service';
import {PhrasesEffects} from './phrases/store/phrases.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    PhrasesComponent,
    PhraseComponent,
    WordComponent,
    DictionaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([PhrasesEffects]),
    AuthModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    UiService,
    AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {}
