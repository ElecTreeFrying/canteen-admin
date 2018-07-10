import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: Observable<any>;

  constructor(private auth: AngularFireAuth) {
    this.state = auth.authState;

    this.state.subscribe((state) => {
      // console.clear();
      state !== null ? console.log(state) : 0;
    });
  }


}
