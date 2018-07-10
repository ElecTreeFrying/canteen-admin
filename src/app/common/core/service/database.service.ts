import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({ providedIn: 'root' })
export class DatabaseService {

  ref: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  createDocument(path: string, data: any) {
    return this.db.list<any>(path).push(data);
  }

  readDocument(path: string) {
    return this.db.list<any>(path).valueChanges();
  }

}
