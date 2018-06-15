import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsMaterialModule } from '../../../common/core/module/transactions-material.module';

import { TransactionsComponent } from './transactions.component';
import { TransactionSettingsComponent } from '../../../common/shared/component/transaction-settings/transaction-settings.component';


@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    TransactionsMaterialModule
  ],
  declarations: [
    TransactionsComponent,
    TransactionSettingsComponent
  ],
  entryComponents: [
    TransactionSettingsComponent
  ]
})
export class TransactionsModule { }
