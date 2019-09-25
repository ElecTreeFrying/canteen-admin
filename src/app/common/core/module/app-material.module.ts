import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSnackBarModule,
} from '@angular/material';
@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class AppMaterialModule { }
