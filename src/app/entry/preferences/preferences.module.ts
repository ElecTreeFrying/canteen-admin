import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesMaterialModule } from '../../common/core/module/preferences-material.module';

import { PreferencesComponent } from './preferences.component';
import { ReAuthComponent } from '../../common/shared/component/re-auth/re-auth.component';
import { ChangePhotoComponent } from '../../common/shared/component/change-photo/change-photo.component';

import { StorageService } from '../../common/core/service/storage.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PreferencesRoutingModule,
    PreferencesMaterialModule
  ],
  declarations: [
    PreferencesComponent,
    ReAuthComponent,
    ChangePhotoComponent,
  ],
  entryComponents: [
    ReAuthComponent,
    ChangePhotoComponent,
  ],
  providers: [
    StorageService
  ]
})
export class PreferencesModule { }
