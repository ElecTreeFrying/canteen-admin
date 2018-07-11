import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatCheckbox, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, startWith, debounceTime, take } from 'rxjs/operators'
import * as _ from 'lodash';

import { FirestoreService } from '../../../core/service/firestore.service';

let VALUE = '';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: [ './product-add.component.scss', './svg.scss' ]
})
export class ProductAddComponent implements OnInit {

  @ViewChild('check1') check1: MatCheckbox;
  @ViewChild('check2') check2: MatCheckbox;

  form: FormGroup;
  beverageGroupControl: FormControl;
  beverageNameControl: FormControl;
  sellingPriceControl: FormControl;


  isAllowed: boolean = false;
  isAddBeverageGroup: boolean = true;
  isNewProductValidated: boolean = false;
  isFirstInalid: boolean = true;
  newBeverageGroup: string = '';
  newBeverageName: string = '';
  newBeverageSellingPrice: number = 0;

  reactiveBeverageGroup: any;
  beverageGroup: any[] = [];

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    private firestore: FirestoreService
  ) {
    this.form = fb.group({
      'beverageGroup': [ '', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.pattern(/^[A-z0-9\s_.-]+$/) ],
        CustomValidator.beverageGroup(afs) ],
      'beverageName': [ '', [
        Validators.required,
        Validators.nullValidator,
        Validators.minLength(3),
        Validators.pattern(/^[A-z0-9\s_.-]+$/) ] ],
      'sellingPrice': [ '', [
        Validators.required,
        Validators.min(5),
        Validators.max(100) ] ]
    })

    this.beverageGroupControl = new FormControl('');
    this.beverageNameControl = new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(3),
      Validators.pattern(/^[A-z0-9\s_.-]+$/) ],
      CustomValidator.beverageName(afs));
    this.sellingPriceControl = new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(100) ]);
  }

  get beverageNameErrors() { return this.beverageNameControl.errors }
  get sellingPriceErrors() { return this.sellingPriceControl.errors }
  get formBeverageGroup() { return this.form.get('beverageGroup') }
  get formBeverageName() { return this.form.get('beverageName') }
  get formSellingPrice() { return this.form.get('sellingPrice') }

  ngOnInit() {
    this.beverageNameControl.disable();
    this.sellingPriceControl.disable();
    this.formBeverageName.disable();
    this.formSellingPrice.disable();

    this.reactiveBeverageGroup = this.beverageGroupControl.valueChanges
      .pipe( startWith(''), map(val => this.displayFn(val)), map(name => this.filterBeverageGroup(name)) );

    this.firestore.readProductList()
      .subscribe((response) => (this.beverageGroup = _.uniqBy(response, 'beverageGroup')));

    this.beverageGroupControl.valueChanges.subscribe((response) => {
      const ifYes = () => {
        this.beverageNameControl.enable();
        this.isAllowed = true;
      };
      const ifNo = () => {
        this.beverageNameControl.disable();
        this.beverageNameControl.patchValue('');
        this.isAllowed = false;
      };
      typeof response === 'object' ? ifYes() : ifNo();
    });

    this.beverageNameControl.statusChanges.subscribe((response) => {
      switch (response) {
        case 'INVALID':
        case 'PENDING': {
          this.sellingPriceControl.disable();
          this.sellingPriceControl.patchValue('');
          break;
        }
        case 'VALID': {
          this.sellingPriceControl.enable();
          break
        }
        default: break;
      }
    });

    this.sellingPriceControl.valueChanges.subscribe((response) => {
      this.isFirstInalid = this.sellingPriceControl.invalid ? true : false;
    });

    this.formBeverageGroup.statusChanges.subscribe((response) => {
      switch (response) {
        case 'INVALID':
        case 'PENDING': {
          this.formBeverageName.disable();
          this.formSellingPrice.disable();
          this.formBeverageName.patchValue('');
          this.formSellingPrice.patchValue('');
          break;
        }
        case 'VALID': {
          this.formBeverageName.enable();
          this.formSellingPrice.enable();
          break
        }
        default: break;
      }
    });

    // this.firestore.mapChanges().subscribe((response) => {
    //   console.log(response);
    // });
  }

  onCkeckbox(option: boolean) {
    this.isAddBeverageGroup = option ? true : false;
  }

  onProcess() {
    if (this.beverageNameControl.invalid) return;
    this.isNewProductValidated = true;

    const beverageGroup = this.beverageGroupControl.value.beverageGroup;
    const beverageName = this.beverageNameControl.value;
    const sellingPrice = this.sellingPriceControl.value;

    this.newBeverageGroup = beverageGroup;
    this.newBeverageName = `${beverageGroup} ${beverageName}`;
    this.newBeverageSellingPrice = sellingPrice;
  }

  addBeverage() {
    this.firestore.addNewBeverage(this.form.value);
    this.dialog.closeAll();
  }

  // second

  onAdd() {
    const newBeverage = { beverageGroup: this.newBeverageGroup, beverageName: this.newBeverageName, sellingPrice: this.newBeverageSellingPrice };
    this.firestore.addNewBeverage(newBeverage);
    this.dialog.closeAll();
  }

  onCancel() {
    this.sellingPriceControl.disable();
    this.isNewProductValidated = false;
    this.isFirstInalid = true;
    this.onClear();
  }

  // input helper

  onClear() {
    this.beverageGroupControl.patchValue('');
    this.beverageNameControl.patchValue('');
    this.sellingPriceControl.patchValue('');
    this.form.reset();
  }

  onFocus() {
    this.beverageGroupControl.patchValue(this.beverageGroupControl.value || '');
  }

  // autocomplete methods

  onSelect(group: any) {
    const beverageGroup = this.beverageGroupControl.value.beverageGroup;
    VALUE = beverageGroup;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.beverageGroup : value;
  }

  private filterBeverageGroup(val: string) {
    return val ? this._filter(this.beverageGroup, val) : this.beverageGroup;
  }

  private _filter(values: any[], val: string) {
    const filterValue = val.toLowerCase();
    return values.filter(value => value.beverageGroup.toLowerCase().startsWith(filterValue));
  }

}

export class CustomValidator {

  static beverageGroup(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const beverageGroup = control.value;
      return afs.collection('product-list', ref => ref.where('beverageGroup', '==', beverageGroup))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { beverageGroupDuplicate: true } : null)
        );
    }
  }

  static beverageName(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const beverageName = control.value;
      return afs.collection('product-list', ref => ref.where('beverageName', '==', `${VALUE} ${beverageName}`))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { beverageNameDuplicate: true } : null)
        );
    }
  }

}
