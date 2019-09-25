import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatDividerModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ]
})
export class EntryMaterialModule { }
