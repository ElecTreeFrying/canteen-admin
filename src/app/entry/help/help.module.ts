import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpMaterialModule } from '../../common/core/module/help-material.module';

import { HelpComponent } from './help.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    HelpMaterialModule
  ],
  declarations: [
    HelpComponent
  ]
})
export class HelpModule { }
