import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: Observable<any>;

  constructor(
    private router: Router,
    private fire: AngularFireAuth,
    private firestore: FirestoreService
  ) {
    this.state = fire.authState;

    this.state.subscribe((state) => {
      // console.clear();
      state !== null ? console.log(state) : 0;
    });
  }

  signUp(email: string, password: string): Promise<any> {
    return this.fire.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(auth: any): Promise<any> {
    return this.fire.auth.signInWithEmailAndPassword(auth.email, auth.password);
  }

  signOut() {
    return this.fire.auth.signOut().then(() => {
      this.firestore.disableNetwork().then(() => {
        this.router.navigate(['/']);
        // this.sharedService.signOutSuccess();
      });
    });
  }


}
