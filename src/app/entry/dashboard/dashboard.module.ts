import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMaterialModule } from '../../common/core/module/dashboard-material.module';

import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardMaterialModule
  ],
  declarations: [
    DashboardComponent,
    MainComponent
  ]
})
export class DashboardModule { }
