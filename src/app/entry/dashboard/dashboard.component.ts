import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {SelectionModel} from '@angular/cdk/collections';

import { FirestoreService } from '../../common/core/service/firestore.service';
import { DatabaseService } from '../../common/core/service/database.service';

import { TransactionSettingsComponent } from '../../common/shared/component/transaction-settings/transaction-settings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: ProductDataSource | MatTableDataSource<any>;
  dialogRef: MatDialogRef<TransactionSettingsComponent>;
  selection = new SelectionModel<any>(true, []);

  displayedColumns = ['select', 'id', 'beverageName', 'code', 'beginning', 'delivery', 'waste', 'total', 'ending', 'sold', 'sellingPrice', 'amount'];
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
    setTimeout(() => {this.openSettings()});
  }

  onSelectRow(selected: any) {
    this.dataSource.data.forEach(row => {

      selected.beverageName === row.beverageName
        ? !<boolean>this.selection.isSelected(row) ? console.log(row)
        : 0 : this.selection.deselect(row);

    });
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

  openSettings() {
    this.dialogRef = this.dialog.open(TransactionSettingsComponent, {
      closeOnNavigation: true,
    })
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
