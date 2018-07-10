import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

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
    this.firestore.firestore.enableNetwork();
  }

  disableNetwork() {
    this.firestore.firestore.disableNetwork();
  }

  addDocumentToCollection(path: string, data: any): void {
    this.firestore.collection<any>(path).add(data);
  }

  addDocumentToCollectionInRtdb(path: string, data: any): void {
    this.database.createDocument(path, data);
  }

  readCollectionValueChanges(path: string): Observable<any[]> {
    return this.firestore.collection<any>(path).valueChanges();
  }

  readCollectionSnapshotChanges(path: string): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection<any>(path).snapshotChanges();
  }

  mapChanges() {
    return this.productListCollection.snapshotChanges().pipe(
      map((values: DocumentChangeAction<any>[]) => {
        return values.map((value: DocumentChangeAction<any>) => {

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

        return _.sortBy(array, [data => data.id]);
      })
    );
  }

}



















//
