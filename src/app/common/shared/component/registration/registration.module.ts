import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationMaterialModule } from '../../../core/module/registration-material.module';

import { RegistrationComponent } from './registration.component';

import { FirestoreService } from '../../../core/service/firestore.service';
import { DatabaseService } from '../../../core/service/database.service';

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
    DatabaseService
  ]
})
export class RegistrationModule { }
