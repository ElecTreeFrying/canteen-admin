import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../common/core/service/authentication.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe((response) => {
      this.isAuthenticated = response;
    });
  }

}
