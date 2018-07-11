import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMaterialModule } from '../../common/core/module/dashboard-material.module';

import { DashboardComponent } from './dashboard.component';
import { ProductUpdateComponent } from '../../common/shared/component/product-update/product-update.component';
import { ProductRemoveComponent } from '../../common/shared/component/product-remove/product-remove.component';
import { ProductAddComponent } from '../../common/shared/component/product-add/product-add.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardMaterialModule
  ],
  declarations: [
    DashboardComponent,
    ProductUpdateComponent,
    ProductRemoveComponent,
    ProductAddComponent
  ],
  entryComponents: [
    ProductUpdateComponent,
    ProductRemoveComponent,
    ProductAddComponent
  ]
})
export class DashboardModule { }
