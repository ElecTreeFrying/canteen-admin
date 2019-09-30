import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { DatabaseService } from '../../common/core/service/database.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: ProductDataSource | MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selectedRow: any = null;

  displayedColumns = ['select', 'beverageName', 'code', 'sold', 'sellingPrice', 'amount'];
  firestoreData: any[];
  
  summaryItems: any;
  total: any = 0;
  sold: any = 0;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    
    this.summaryItems = this.database.readReportSummary()
    
    this.database.readReportSummary().subscribe((data: any[]) => {
      
      this.firestoreData = data;
      this.dataSource = new ProductDataSource(data);
      
      this.applyFilter('');
    });
  }
  
  selectItem(item: any) {
    
    let entries: any[] = Object.entries(item.doc);
    entries = entries.map((entry) => entry[1])
    
    this.total = entries.reduce<number>((acc: any, current: any) => acc + current.amount, 0).toFixed(2).toString() + 'php';
    this.sold = entries.reduce((acc: any, current: any) => acc + current.sold, 0).toString() + ' items';
    
    this.firestoreData = entries;
    this.dataSource = new ProductDataSource(entries);
    
    this.applyFilter('');
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
  }

  deselect(row?: any) {
    this.selectedRow = null; row;
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
