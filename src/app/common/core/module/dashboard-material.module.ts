import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatRadioModule,
  MatDividerModule,
  MatMenuModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule,
    MatMenuModule,
  ]
})
export class DashboardMaterialModule { }
