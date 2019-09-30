import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class AccountDetailsMaterialModule { }
