import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../core/service/database.service';

@Component({
  selector: 'app-list-kiosk',
  templateUrl: './list-kiosk.component.html',
  styleUrls: ['./list-kiosk.component.scss']
})
export class ListKioskComponent implements OnInit {

  users: any;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.users = this.database.kioskAccounts;
  }

}
