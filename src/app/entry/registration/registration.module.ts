import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationMaterialModule } from '../../common/core/module/registration-material.module';

import { RegistrationComponent } from './registration.component';

import { FirestoreService } from '../../common/core/service/firestore.service';
import { DatabaseService } from '../../common/core/service/database.service';
import { NoticeService } from '../../common/core/service/notice.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    RegistrationMaterialModule
  ],
  declarations: [
    RegistrationComponent
  ],
  providers: [
    FirestoreService,
    DatabaseService,
    NoticeService
  ]
})
export class RegistrationModule { }
