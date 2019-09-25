import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { FirestoreService } from '../../common/core/service/firestore.service';
import { DatabaseService } from '../../common/core/service/database.service';

import { ProductAddComponent } from '../../common/shared/component/product-add/product-add.component';
import { ProductUpdateComponent } from '../../common/shared/component/product-update/product-update.component';
import { ProductRemoveComponent } from '../../common/shared/component/product-remove/product-remove.component';
import { TestDeviceAddComponent } from '../../common/shared/component/test-device-add/test-device-add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: ProductDataSource | MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedRow: any = null;
  isDisabled: boolean = true;
  isHideSellingPrice: boolean = false;

  displayedColumns = ['select', 'beverageName', 'code', 'beginning', 'delivery', 'waste', 'total', 'ending', 'sold', 'sellingPrice', 'amount'];
  firestoreData: any[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private database: DatabaseService,
  ) {
    this.displayData();
  }

  ngOnInit() {
    this.database.parseMachineData();
  }

  onSelectRow(selected: any) {
    
    this.dataSource.data.forEach((row: any) => {
      selected.beverageName === row.beverageName
        ? !<boolean>this.selection.isSelected(row)
          ? this.selected(row)
          : this.deselect(row)
        : this.selection.deselect(row);

    });
  }

  selected(row: any) {
    this.selectedRow = row;
    this.isDisabled = false;
  }

  deselect(row?: any) {
    this.selectedRow = null; row;
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
  
  openAdd() {
    this.dialog.open(ProductAddComponent);
    this.selection.clear();
    this.deselect();
  }

  openUpdate() {
    this.dialog.open(ProductUpdateComponent, { data: this.selectedRow });
    this.selection.clear();
    this.deselect();
  }

  openRemove() {
    this.dialog.open(ProductRemoveComponent, { data: this.selectedRow });
    this.selection.clear();
    this.deselect();
  }

  openPets() {
    this.dialog.open(TestDeviceAddComponent);
  }
  
  displayData(item?: number) {
    this.firestore.readProductList().subscribe((data: any[]) => {
      
      if (item === 1) {
        this.firestoreData = this.isHideSellingPrice
          ? data.filter((a) => a.sellingPrice.length > 0).filter((a) => a.amount > 0)
          : data.filter((a) => a.amount > 0);
      } else if (item === 2) {
        this.isHideSellingPrice = true;
        this.firestoreData = data.filter((a) => a.sellingPrice.length > 0);
      } else if (item === 3) {
        this.firestoreData = this.isHideSellingPrice
          ? data.filter((a) => a.sellingPrice.length > 0).filter((a) => a.amount < 1)
          : data.filter((a) => a.amount < 1);
      } else {
        this.firestoreData = data;
        this.isHideSellingPrice = false;
      }
      
      this.dataSource = new ProductDataSource(data);
      
      this.applyFilter('');
    });
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

// private test() {
//   setTimeout(() => {
//
//     let data = this.firestoreData;
//
//     var _a = 240;
//     var _b = 249;
//
//     for (let i = 0; i < 7; i++) {
//
//       data
//         .map((a, i) => this.database.transfer[i])
//         .filter((a) => {
//           const code = Number(a.slice(0, 3));
//           return code >= _a && code <= _b;
//         }).map((a, i) => {
//           this.database.pushThis({ item: a }, `pl-${_a}-${_b}`)
//         })
//
//       [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((a, i) => {
//
//         this.database.pushThis({ item: `${_a+(a-1)}` }, `pl-${_a}-${_b}`);
//       })
//
//
//       _a = _a + 10;
//       _b = _b + 10;
//     }
//
//     data = data.map((a) => {
//       delete a['amount'];
//       delete a['beginning'];
//       delete a['beverageGroup'];
//       delete a['delivery'];
//       delete a['ending'];
//       delete a['id'];
//       delete a['sellingPrice'];
//       delete a['sold'];
//       delete a['total'];
//       delete a['uid'];
//       delete a['waste'];
//
//       a['item'] = `${a['code']} ${a['beverageName']}`
//
//       // delete a['code'];
//       delete a['beverageName'];
//
//       return a
//     }).filter((a) => {
//       return a['code'] >= 100 && a['code'] < 110
//     });
//
//     console.log(data);
//
//     const z = data.slice(0, 50);
//
//     data.forEach((a) => {
//       this.database.testAll(a);
//     })
//
//     console.log(_20);
//
//   }, 1000);
// }
