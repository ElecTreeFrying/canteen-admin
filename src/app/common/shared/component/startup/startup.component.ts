import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/service/auth.service';
import { DatabaseService } from '../../../core/service/database.service';
import { FirestoreService } from '../../../core/service/firestore.service';
import { SharedService } from '../../../core/service/shared.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  form: FormGroup;
  isProgressing: boolean = false;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private database: DatabaseService,
    private firestore: FirestoreService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'email': [ '', [ ] ],
      'password': [ '', [ ] ]
    })
  }

  ngOnInit() {
  }

  get emailError(): ValidationErrors { return this.form.get('email').errors; }
  get passwordError(): ValidationErrors { return this.form.get('password').errors; }

  onSubmit() {
    this.isProgressing = true;

    if (this.form.invalid) {
      this.isProgressing = false;
      return;
    }
    
    this.database.readOnline().subscribe((res) => {
    
      if (res.length === 0) {
        this.auth.signIn(this.form.value)
        .then(() => {
          this.isProgressing = false;
          this.firestore.enableNetwork();
          this.router.navigate(['/', 'a']);
          this.shared.openSnack({
            duration: 3500,
            horizontal: 'center',
            vertical: 'bottom',
            message: 'Logged in successfully.'
          })
        }).catch((e) => {
          this.isProgressing = false;
          this.shared.openSnack({
            duration: 3500,
            horizontal: 'center',
            vertical: 'bottom',
            message: e['message']
          })
          this.form.patchValue({
            password: ''
          })
        });
      } else {
        this.isProgressing = false;
        this.shared.openSnack({
          duration: 3500,
          horizontal: 'center',
          vertical: 'bottom',
          message: 'Another instance is opened.'
        })
        this.form.patchValue({
          email: '',
          password: ''
        })
      }
    
    });

    }

}
