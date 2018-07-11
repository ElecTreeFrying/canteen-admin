import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {SelectionModel} from '@angular/cdk/collections';

import { FirestoreService } from '../../common/core/service/firestore.service';
import { DatabaseService } from '../../common/core/service/database.service';

import { ProductUpdateComponent } from '../../common/shared/component/product-update/product-update.component';
import { ProductRemoveComponent } from '../../common/shared/component/product-remove/product-remove.component';
import { ProductAddComponent } from '../../common/shared/component/product-add/product-add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: ProductDataSource | MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedRow: any = null;
  isDisabled: boolean = true;

  displayedColumns = ['select', 'beverageName', 'code', 'beginning', 'delivery', 'waste', 'total', 'ending', 'sold', 'sellingPrice', 'amount'];
  firestoreData: any[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private database: DatabaseService
  ) {
    firestore.readProductList().subscribe((data: any) => {
      this.firestoreData = data;
      this.dataSource = new ProductDataSource(data);

      this.applyFilter('');
    });
  }

  ngOnInit() {
  }

  onSelectRow(selected: any) {
    this.dataSource.data.forEach(row => {

      selected.beverageName === row.beverageName
        ? !<boolean>this.selection.isSelected(row) ? this.selected(row)
        : this.deselect(row) : this.selection.deselect(row);

    });
  }

  selected(row: any) {
    this.selectedRow = row;
    this.isDisabled = false;
  }

  deselect(row: any) {
    this.selectedRow = null;
    this.isDisabled = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.firestoreData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUpdate() {
    this.dialog.open(ProductUpdateComponent, { data: this.selectedRow })
  }

  openRemove() {
    this.dialog.open(ProductRemoveComponent, { data: this.selectedRow })
  }

  openAdd() {
    this.dialog.open(ProductAddComponent)
  }

}

export class ProductDataSource extends MatTableDataSource<any> {

  behavior: BehaviorSubject<any>;

  constructor(public data: any) {
    super();
    this.behavior = new BehaviorSubject<any>(data);
  }

  connect(): BehaviorSubject<any[]> {
    return this.behavior;
  }

  disconnect() { }

}
