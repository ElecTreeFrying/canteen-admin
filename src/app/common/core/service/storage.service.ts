import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { storage } from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadState: AngularFireUploadTask;
  uploadedFile = new Subject<any>();

  constructor(
    private storage: AngularFireStorage,
  ) { }

  async uploadFile(file: File) {

    this.uploadState = this.storage.ref(`display-photo/${file.name}`).put(file);

    return this.uploadState.then((snapshot: storage.UploadTaskSnapshot) => {
      return snapshot.ref.getDownloadURL();
    })
  }

}
