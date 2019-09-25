import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { FirestoreService } from '../../../core/service/firestore.service';

@Component({
  selector: 'app-product-update-confirm',
  templateUrl: './product-update-confirm.component.html',
  styleUrls: ['./product-update-confirm.component.scss']
})
export class ProductUpdateConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
    const newData = this.data;
    newData.beverage['sellingPrice'] = Number(newData.beverage['sellingPrice']).toFixed(2).toString();
    this.data = newData
  }

  onContinue() {
    this.firestore.updateBeverage(this.data.uid, this.data.beverage, this.data.code);
    this.dialog.closeAll();
  }
  
}
