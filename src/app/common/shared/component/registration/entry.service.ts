import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from '../../../core/service/auth.service';
import { FirestoreService } from '../../../core/service/firestore.service';
import { SharedService } from '../../../core/service/shared.service';

import { User } from '../../interface/interface';
import { UserModel } from '../../model/model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private shared: SharedService
  ) { }

  async createNewUser(userDetails: User): Promise<any> {

    return this.auth.signUp(userDetails.email, userDetails.password)
      .then((state) => {
        
        this.firestore.enableNetwork();

        const timestamp = moment().unix();
        const user = new UserModel(state.user.uid, timestamp, userDetails);

        const firstname = user.user.firstName;
        const lastname = user.user.lastName;
        const url = 'https://api.adorable.io/avatars/285/';
        
        setTimeout(() => { this.auth.updateDisplayFirstName(firstname) }, 1000);
        setTimeout(() => { this.auth.updateDisplayLastName(lastname) }, 1500);
        setTimeout(() => { this.auth.updatePhotoURL(`${url}${this.shared.randomHash}`).subscribe(() => 0) }, 2000);
        
        this.firestore.createNewUser({ ...user });

        return user;

      });

  }

}
