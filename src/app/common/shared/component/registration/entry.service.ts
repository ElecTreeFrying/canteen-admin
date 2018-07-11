import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from '../../../core/service/auth.service';
import { FirestoreService } from '../../../core/service/firestore.service';
import { DatabaseService } from '../../../core/service/database.service';

import { User } from '../../interface/interface';
import { UserModel } from '../../model/model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {


  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private database: DatabaseService
  ) { }

  createNewUser(userDetails: User): Promise<any> {

    return this.auth.signUp(userDetails.email, userDetails.password)
      .then((state: any) => {

        this.firestore.enableNetwork();

        const timestamp = moment().unix();

        const user = new UserModel(state.user.uid, timestamp, userDetails);

        this.firestore.usersCollection.add({ ...user });
        this.database.createDocument('users', user);

        return user;

      });

  }

}
