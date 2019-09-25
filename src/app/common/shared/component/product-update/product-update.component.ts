import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { DatabaseService } from '../../../core/service/database.service';
import { SharedService } from '../../../core/service/shared.service';

import { ProductUpdateConfirmComponent } from '../product-update-confirm/product-update-confirm.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup;
  beverageShortName: string = '';

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private database: DatabaseService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'beverageGroup': [ this.data.beverageGroup ],
      'beverageShortName': [ '', [
        Validators.required,
        Validators.minLength(14),
      ] ],
      'beverageName': [ this.data.beverageName, [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.pattern(/^[A-z0-9\s_.-]+$/)
      ] ],
      'sellingPrice': [ this.data.sellingPrice, [
        Validators.required,
        Validators.max(99),
      ] ],
      'beginning': [ this.data.beginning, [
        Validators.required,
        Validators.max(99),
      ] ],
      'delivery': [ this.data.delivery, [
        Validators.required,
        Validators.max(99),
      ] ],
      'waste': [ this.data.waste, [
        Validators.required,
        Validators.max(99),
      ] ],
      'total': [ this.data.total, [
        Validators.required,
        Validators.max(99),
      ] ],
      'ending': [ this.data.ending, [
        Validators.required,
        Validators.max(99),
      ] ],
      'sold': [ this.data.sold, [
        Validators.required,
        Validators.max(999),
      ] ]
    })
  }
  
  get formBeverageShorName() { return this.form.get('beverageShortName') }
  get formBeverageName() { return this.form.get('beverageName') }
  get formSellingPrice() { return this.form.get('sellingPrice') }
  get formBeginning() { return this.form.get('beginning') }
  get formDelivery() { return this.form.get('delivery') }
  get formWaste() { return this.form.get('waste') }
  get formTotal() { return this.form.get('total') }
  get formEnding() { return this.form.get('ending') }
  get formSold() { return this.form.get('sold') }

  ngOnInit() {
    
    this.database.readPlRange(this.data.code).subscribe((res: any) => {
      
      const beverageShortName = res.item.slice(4);
      this.form.patchValue({ beverageShortName: beverageShortName });
    });
    
    this.form.get('beverageGroup').disable();
  }
  
  onClickSellingPrice() {
    this.formSellingPrice.patchValue('');
  }

  onUpdate() {
    
    if (this.form.invalid) return;
    
    const uid = this.data.uid;
    const beverage = this.form.value;
    
    this.database.compareToUpdate(beverage).subscribe((res) => {

      !res
        ? this.dialog.open(ProductUpdateConfirmComponent, {
          data: { uid, beverage, code: this.data.code }
        }).afterOpened().subscribe(() => this.shared.snack.dismiss())
        : this.shared.openSnack({
          message: 'No changes happend.',
          duration: 3500,
          horizontal: 'center',
          vertical: 'bottom'
        })

    });
    
    
    
  }

}
