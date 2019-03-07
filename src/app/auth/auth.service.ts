import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from 'firebase';

import {AuthData} from './auth-data.model';
import {AppState} from '../store/app.reducer';
import { SetAuthenticated, SetUnauthenticated } from './store/auth.actions';
import {UiService} from '../shared/ui.service';
import {StartLoading, StopLoading} from '../shared/ui/ui.actions';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
              private uiService: UiService,
              private router: Router,
              private store: Store<AppState>) {}

  initAuthListener() {
    this.afAuth.user.subscribe((user: User) => {
      if (user) {
        this.store.dispatch(new SetAuthenticated());
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(new SetUnauthenticated());
      }
    });
  }

  login(authData) {
    this.store.dispatch(new StartLoading());

    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(() => {
      this.store.dispatch(new StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new StopLoading());
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(() => {
      this.store.dispatch(new StopLoading());
    })
    .catch(err => {
      this.store.dispatch(new StopLoading());
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

