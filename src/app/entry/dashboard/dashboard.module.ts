import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMaterialModule } from '../../common/core/module/dashboard-material.module';

import { DashboardComponent } from './dashboard.component';
import { TransactionSettingsComponent } from '../../common/shared/component/transaction-settings/transaction-settings.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardMaterialModule
  ],
  declarations: [
    DashboardComponent,
    TransactionSettingsComponent
  ],
  entryComponents: [
    TransactionSettingsComponent
  ]
})
export class DashboardModule { }
