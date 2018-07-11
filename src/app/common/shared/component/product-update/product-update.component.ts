import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { FirestoreService } from '../../../core/service/firestore.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private firestore: FirestoreService
  ) {
    this.form = fb.group({
      'beverageGroup': [ this.data.beverageGroup ],
      'beverageName': [ this.data.beverageName ],
      'sellingPrice': [ this.data.sellingPrice ],
      'beginning': [ this.data.beginning ],
      'delivery': [ this.data.delivery ],
      'waste': [ this.data.waste ],
      'total': [ this.data.total ],
      'ending': [ this.data.ending ],
      'sold': [ this.data.sold ]
    })
  }

  ngOnInit() {
    this.form.get('beverageGroup').disable();
  }

  onUpdate() {
    const uid = this.data.uid;
    const beverage = this.form.value;
    this.firestore.updateBeverage(uid, beverage);
    this.dialog.closeAll();
  }

}
