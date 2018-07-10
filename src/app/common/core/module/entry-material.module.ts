import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class EntryMaterialModule { }
