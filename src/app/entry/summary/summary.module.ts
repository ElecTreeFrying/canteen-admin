import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryMaterialModule } from '../../common/core/module/summary-material.module';

import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [
    CommonModule,
    SummaryRoutingModule,
    SummaryMaterialModule
  ],
  declarations: [
    SummaryComponent
  ]
})
export class SummaryModule { }
