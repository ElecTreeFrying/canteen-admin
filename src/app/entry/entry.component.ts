import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { AuthenticationService } from '../common/core/service/authentication.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  isAuthenticated: boolean = false;
  isNavigated: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {

    const length = this.router.url.split('/').length;
    this.isNavigated = length === 2 ? false : true;

    this.router.events.subscribe((route: NavigationStart) => {
      if (route instanceof NavigationStart) {
        const length = route.url.split('/').length;
        this.isNavigated = length === 2 ? false : true;
      }
    });

    this.auth.isAuthenticated.subscribe((response) => {
      this.isAuthenticated = response;
    });

  }

}
