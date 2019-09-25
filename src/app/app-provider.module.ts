import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppMaterialModule } from './common/core/module/app-material.module';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

import { SharedService } from './common/core/service/shared.service';

import { environment } from '../environments/environment';


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  exports: [
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppMaterialModule
  ],
  providers: [
    SharedService
  ]
})
export class AppProviderModule { }
