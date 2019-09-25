import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { DatabaseService } from './database.service';

const PATH = 'product-list';
// const PATH = 'new-pl';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usersCollection: AngularFirestoreCollection<any>;
  productListCollection: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private database: DatabaseService
  ) {
    this.usersCollection = firestore.collection<any>('users');
    this.productListCollection = firestore.collection<any>('product-list');
  }

  enableNetwork() {
    return this.firestore.firestore.enableNetwork();
  }

  disableNetwork() {
    return this.firestore.firestore.disableNetwork();
  }
  
  createNewUser(user: any) {
    this.usersCollection.add(user);
    this.database.createNewUser('users', user);
  }

  addNewBeverage(beverage: any) {
    this.database.addNewBeverage(PATH, beverage);

    this.productListCollection.add({
      amount: 0, beginning: 0, delivery: 0, ending: 0, sold: 0, total: 0, waste: 0, code: '',
      beverageGroup: beverage.beverageGroup,
      beverageName: `${beverage.beverageGroup} ${beverage.beverageName}`,
      sellingPrice: beverage.sellingPrice,
    })
  }

  updateBeverage(uid: string, beverage: any, code: number) {
    this.database.updateBeverage(PATH, uid, beverage, code);

    let count = 0;
    const obs = this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>) => {
          const ref = value.payload.doc;

          if (count !== 0) return;

          if (ref.data()['beverageName'] === beverage.beverageName) {
            ref.ref.update(beverage);
            obs.unsubscribe();
            return count++;
          }
        })
      })
    ).subscribe(() => (true));
  }

  removeBeverage(data: any) {
    this.database.removeBeverage(PATH, data);

    let count = 0;
    const obs = this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>) => {
          const ref = value.payload.doc;

          if (count !== 0) return;

          if (ref.data()['beverageName'] === data.beverageName) {
            ref.ref.delete();
            obs.unsubscribe();
            return count++;
          }
        })
      })
    ).subscribe(() => (true));
  }

  readProductList() {
    return this.database.readProductList(PATH);
  }

}
