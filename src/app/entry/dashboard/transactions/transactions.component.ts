import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { FirestoreService } from '../../../common/core/service/firestore.service';

import { TransactionSettingsComponent } from '../../../common/shared/component/transaction-settings/transaction-settings.component';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: ProductDataSource | MatTableDataSource<any>;
  dialogRef: MatDialogRef<TransactionSettingsComponent>;

  displayedColumns = ['id', 'beverageName', 'code', 'beginning', 'delivery', 'waste', 'total', 'ending', 'sold', 'sellingPrice', 'amount'];
  firestoreData: any[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService
  ) {
    firestore.readProductList().subscribe((data: any) => {
      this.firestoreData = data;
      this.dataSource = new ProductDataSource(data);

      this.applyFilter('');
    });
  }

  ngOnInit() {
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
