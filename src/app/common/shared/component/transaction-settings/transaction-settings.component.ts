import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatExpansionPanel, MatCheckbox } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators'
import * as _ from 'lodash';

import { FirestoreService } from '../../../core/service/firestore.service';

@Component({
  selector: 'app-transaction-settings',
  templateUrl: './transaction-settings.component.html',
  styleUrls: ['./transaction-settings.component.scss']
})
export class TransactionSettingsComponent implements OnInit {

  @ViewChild('expansionPanel') panel: MatExpansionPanel;
  @ViewChild('check1') check1: MatCheckbox;
  @ViewChild('check2') check2: MatCheckbox;

  beverageGroupControl: FormControl;
  beverageNameControl: FormControl;
  isAddBeverageGroup: boolean = true;
  reactiveBeverageGroup: any;
  beverageGroup: any[] = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.beverageGroupControl = new FormControl('');
    this.beverageNameControl = new FormControl('');

    this.reactiveBeverageGroup = this.beverageGroupControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.displayFn(val)),
        map(name => this.filterBeverageGroup(name))
      );

    this.firestore.readProductList()
      .subscribe((response) => (this.beverageGroup = _.uniqBy(response, 'beverageGroup')));

    this.panel.open();
  }

  onClear() {
    this.beverageGroupControl.reset();
  }

  onFocus() {
    this.beverageGroupControl.patchValue(this.beverageGroupControl.value || '');
  }

  onSelect(group: any) {
    console.log(group);
  }

  onCkeckbox(option: boolean) {
    this.isAddBeverageGroup = option ? true : false;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.beverageGroup : value;
  }

  filterBeverageGroup(val: string) {
    return val ? this._filter(this.beverageGroup, val) : this.beverageGroup;
  }

  private _filter(values: any[], val: string) {
    const filterValue = val.toLowerCase();
    return values.filter(value => value.beverageGroup.toLowerCase().startsWith(filterValue));
  }

}
