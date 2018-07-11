import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';

import { DatabaseService } from './database.service';


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

  addNewBeverage(beverage: any) {
    this.productListCollection.add({
      amount: 0, beginning: 0, delivery: 0, ending: 0,
      sold: 0, total: 0, waste: 0, code: 'z',
      beverageGroup: beverage.beverageGroup,
      beverageName: `${beverage.beverageGroup} ${beverage.beverageName}`,
      sellingPrice: beverage.sellingPrice,
    })
  }

  updateBeverage(uid: string, beverage: any) {
    this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>) => {
          const ref = value.payload.doc;

          ref.id === uid ? ref.ref.update(beverage) : 0;
          return value.payload.doc.data();
        })
      })
    ).subscribe(() => (true));
  }

  removeBeverage(uid: string) {
    this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>) => {
          const ref = value.payload.doc;
          ref.id === uid ? ref.ref.delete() : 0;
          return value.payload.doc.data();
        })
      })
    ).subscribe(() => (true));
  }

  mapChanges() {
    return this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>, index: number) => {

          // codde here

          return value.payload.doc.data();
        })
      })
    )
  }

  readProductList() {
    return this.productListCollection.snapshotChanges().pipe(
      map((value: DocumentChangeAction<any>[], index: number) => {
        const array = value.map((_value: DocumentChangeAction<any>) => {
          const ref = <QueryDocumentSnapshot<any>>_value.payload.doc;
          return { uid: ref.id , ...ref.data() };
        });

        return _.sortBy(array, [data => data.beverageGroup]);
      })
    );
  }

  addDocumentToCollectionFirestore(path: string, data: any): void {
    this.firestore.collection<any>(path).add(data);
  }

  addDocumentToCollectionInRtdb(path: string, data: any): void {
    this.database.createDocument(path, data);
  }

}



















//
