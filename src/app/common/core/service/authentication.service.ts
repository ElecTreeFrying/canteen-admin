import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

import { SignIn } from '../../shared/interface/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebase: AngularFireAuth) {
    firebase.authState.subscribe((state) => {
      console.log(state);
    });
  }

  get isAuthenticated() {
    return this.firebase.authState.pipe(
      map((user: any) => {
        return user !== null;
      })
    )
  }

  signIn(auth: SignIn): Promise<any> {
    return this.firebase.auth.signInWithEmailAndPassword(auth.email, auth.password);
  }

  signUp(email: string, password: string): Promise<any> {
    return this.firebase.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.firebase.auth.signOut();
  }

}
