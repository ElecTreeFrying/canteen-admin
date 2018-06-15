import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../common/core/service/authentication.service';
import { FirestoreService } from '../../../common/core/service/firestore.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private firestore: FirestoreService
  ) { }

  ngOnInit() {
  }

  onSignOut() {
    this.auth.signOut()
      .then(() => {
        this.firestore.disableNetwork();
        this.router.navigate(['/']);
      });
  }

}
