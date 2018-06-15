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
  prodcurListCollection: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private database: DatabaseService
  ) {
    this.usersCollection = firestore.collection<any>('users');
    this.prodcurListCollection = firestore.collection<any>('product-list');
  }

  enableNetwork() {
    this.firestore.firestore.enableNetwork();
  }

  disableNetwork() {
    this.firestore.firestore.disableNetwork();
  }

  addNewCollection(path: string, data: any): void {
    this.firestore.collection<any>(path).add(data);
    this.database.push(path, data);
  }

  readCollectionValueChanges(path: string): Observable<any[]> {
    return this.firestore.collection<any>(path).valueChanges();
  }

  readCollectionSnapshotChanges(path: string): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection<any>(path).snapshotChanges();
  }

  readProductList() {
    return this.prodcurListCollection.snapshotChanges().pipe(
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
