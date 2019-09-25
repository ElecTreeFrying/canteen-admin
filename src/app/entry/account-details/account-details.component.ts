import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../common/core/service/database.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.database.currentUser('')
  }

}
