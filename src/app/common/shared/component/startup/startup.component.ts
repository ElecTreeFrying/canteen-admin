import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/service/auth.service';
import { FirestoreService } from '../../../core/service/firestore.service';

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
    private firestore: FirestoreService
  ) {
    this.form = fb.group({
      'email': [ '', [ Validators.required, Validators.email ] ],
      'password': [ '', [ Validators.required, Validators.minLength(2) ] ]
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
      // this.notice.formError();
      return;
    }

    this.auth.signIn(this.form.value)
      .then(() => {
        this.isProgressing = false;
        // this.notice.signInSuccess();
        this.firestore.enableNetwork();
        this.router.navigate(['/', 'a']);
      }).catch((state) => {
        this.isProgressing = false;
        // this.notice.signInError(state);
      });
    }

}
