import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';

import { AccountDetailsMaterialModule } from '../../common/core/module/account-details-material.module';

@NgModule({
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    AccountDetailsMaterialModule
  ],
  declarations: [
    AccountDetailsComponent
  ]
})
export class AccountDetailsModule { }
