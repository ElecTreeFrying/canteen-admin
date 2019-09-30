import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportProblemRoutingModule } from './report-problem-routing.module';
import { ReportProblemMaterialModule } from '../../common/core/module/report-problem-material.module';

import { ReportProblemComponent } from './report-problem.component';

@NgModule({
  declarations: [
    ReportProblemComponent
  ],
  imports: [
    CommonModule,
    ReportProblemRoutingModule,
    ReportProblemMaterialModule
  ]
})
export class ReportProblemModule { }
