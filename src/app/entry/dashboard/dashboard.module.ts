import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMaterialModule } from '../../common/core/module/dashboard-material.module';

import { DashboardComponent } from './dashboard.component';
import { ProductAddComponent } from '../../common/shared/component/product-add/product-add.component';
import { ProductUpdateComponent } from '../../common/shared/component/product-update/product-update.component';
import { ProductUpdateConfirmComponent } from '../../common/shared/component/product-update-confirm/product-update-confirm.component';
import { ProductRemoveComponent } from '../../common/shared/component/product-remove/product-remove.component';

import { TestDeviceAddComponent } from '../../common/shared/component/test-device-add/test-device-add.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardMaterialModule
  ],
  declarations: [
    DashboardComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductUpdateConfirmComponent,
    ProductRemoveComponent,
    TestDeviceAddComponent
  ],
  entryComponents: [
    ProductAddComponent,
    ProductUpdateComponent,
    ProductUpdateConfirmComponent,
    ProductRemoveComponent,
    TestDeviceAddComponent
  ]
})
export class DashboardModule { }
