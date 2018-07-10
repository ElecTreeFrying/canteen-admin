import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AppMaterialModule { }
