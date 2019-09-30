import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
  ]
})
export class SummaryMaterialModule { }
