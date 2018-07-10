import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesMaterialModule } from '../../common/core/module/preferences-material.module';

import { PreferencesComponent } from './preferences.component';

@NgModule({
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    PreferencesMaterialModule
  ],
  declarations: [
    PreferencesComponent
  ]
})
export class PreferencesModule { }
