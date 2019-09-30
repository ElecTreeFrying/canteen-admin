import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';

import { AccountDetailsMaterialModule } from '../../common/core/module/account-details-material.module';

import { CreateKioskComponent } from '../../common/shared/component/create-kiosk/create-kiosk.component';
import { ListKioskComponent } from '../../common/shared/component/list-kiosk/list-kiosk.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountDetailsRoutingModule,
    AccountDetailsMaterialModule
  ],
  declarations: [
    AccountDetailsComponent,
    CreateKioskComponent,
    ListKioskComponent,
  ],
  entryComponents: [
    CreateKioskComponent,
    ListKioskComponent,
  ]
})
export class AccountDetailsModule { }
