import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryMaterialModule } from '../common/core/module/entry-material.module';

import { EntryComponent } from './entry.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { EntryService } from './entry.service';
import { NoticeService } from '../common/core/service/notice.service';

import { DashboardGuard } from '../common/shared/guard/guard';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryRoutingModule,
    EntryMaterialModule
  ],
  declarations: [
    EntryComponent,
    LandingPageComponent,
  ],
  providers: [
    EntryService,
    NoticeService,
    DashboardGuard
  ]
})
export class EntryModule { }
