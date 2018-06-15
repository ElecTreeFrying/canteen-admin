import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthenticationService } from '../common/core/service/authentication.service';
import { FirestoreService } from '../common/core/service/firestore.service';
import { DatabaseService } from '../common/core/service/database.service';

import { User } from '../common/shared/interface/interface';
import { UserModel } from '../common/shared/model/model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {


  constructor(
    private auth: AuthenticationService,
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
        this.database.push('users', user);

        return user;

      });

  }

}
