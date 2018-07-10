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
  MatExpansionModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatRadioModule
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
    MatExpansionModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatRadioModule
  ]
})
export class DashboardMaterialModule { }
