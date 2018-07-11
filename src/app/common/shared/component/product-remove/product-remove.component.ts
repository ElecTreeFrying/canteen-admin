import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { FirestoreService } from '../../../core/service/firestore.service';

@Component({
  selector: 'app-product-remove',
  templateUrl: './product-remove.component.html',
  styleUrls: ['./product-remove.component.scss']
})
export class ProductRemoveComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialog.closeAll();
  }

  onRemove() {
    this.firestore.removeBeverage(this.data.uid)
    this.onCancel();
  }

}
