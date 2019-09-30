import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase';

import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: Observable<any>;
  image: Observable<any>;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private fire: AngularFireAuth,
    private shared: SharedService,
  ) {
    this.state = fire.authState;

    this.state.subscribe((state) => {
      console.clear();
      state !== null ? console.log(state) : 0;
    });
  }
  
  get currentUser() {
    return this.state.pipe(
      map((state) => {
        state.providerData[0]['emailVerified'] = state.emailVerified;
        delete state.providerData[0]['uid'];
        state.providerData[0]['uid'] = state.uid;
        return { metadata: state.metadata, ...state.providerData[0] }
      })
    )
  }
  
  async deleteAccount(config: any) {
    
    return this.signIn(config).then((res) => {
      return res.user.delete()
    }).then(() => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: 'Account successfully removed.'
      })
    }).catch((e) => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: e['message']
      })
    });
  }
  
  async updateEmail(config: any) {
    
    return this.signIn(config).then((res) => {
      return res.user.updateEmail(config.newEmail)
    }).then(() => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: 'Successfully updated email address.'
      })
    }).catch((e) => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: e['message']
      })
    });
  }
  
  async updatePassword(config: any) {
    
    return this.signIn(config).then((res) => {
      return res.user.updatePassword(config.newPassword);
    }).then(() => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: 'Successfully updated user password.'
      })
    }).catch((e) => {
      this.shared.openSnack({
        duration: 3500, horizontal: 'center', vertical: 'bottom',
        message: e['message']
      })
    });
  }
  
  updateDisplayName(name: string) {
    
    this.fire.user.pipe(
      map((fire) => {
        fire.updateProfile({
          displayName: name,
          photoURL: fire.photoURL
        });
      })
    ).subscribe(() => 0);
  }
  
  updateDisplayFirstName(name: string) {
    
    this.fire.user.pipe(
      map((fire) => {
        fire.updateProfile({
          displayName: name,
          photoURL: fire.photoURL
        });
      })
    ).subscribe(() => 0);
  }
  
  updateDisplayLastName(name: string) {
    
    this.fire.user.pipe(
      map((fire) => {
        fire.updateProfile({
          displayName: name,
          photoURL: fire.photoURL
        });
      })
    ).subscribe(() => 0);
  }
  
  updatePhotoURL(url: string) {
    
    return this.fire.user.pipe(
      map((fire) => {
        fire.updateProfile({
          displayName: fire.displayName,
          photoURL: url
        });
      })
    )
  }
  
  get newImage() {
    return this.fire.user.pipe(
      map((fire) => fire.photoURL)
    )
  }

  async signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fire.auth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(auth: any): Promise<any> {
    return this.fire.auth.signInWithEmailAndPassword(auth.email, auth.password).then((res) => {
      
      this.db.list<any>('online').push({
        isOnline: true
      });
      
      return res;
    });
  }

  async signOut() {
    return this.fire.auth.signOut().then(() => {
      this.router.navigate(['/']);
      
      this.db.list<any>('online').remove();
      
      // this.firestore.disableNetwork().then(() => {
      // this.router.navigate(['/']);
      //   this.sharedService.signOutSuccess();
      // });
    });
  }


}
