import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private database: AngularFireDatabase) { }

  push(path: string, data: any) {

    this.database.list<any>(path).push(data);

  }

}
