import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

import { AuthenticationService } from '../../common/core/service/authentication.service';
import { FirestoreService } from '../../common/core/service/firestore.service';
import { NoticeService } from '../../common/core/service/notice.service';
import { SharedService } from '../../common/core/service/shared.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  signinForm: FormGroup;
  isProgressing: boolean = false;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,

    private auth: AuthenticationService,
    private firestore: FirestoreService,
    private notice: NoticeService,
    private shared: SharedService
  ) {
    this.signinForm = fb.group({
      // 'email': [ '', [ Validators.required, Validators.email ] ],
      // 'password': [ '', [ Validators.required, Validators.minLength(2) ] ]
      'email': [ 'q@q.com', [ Validators.required, Validators.email ] ],
      'password': [ '123123', [ Validators.required, Validators.minLength(2) ] ]
    })
  }

  ngOnInit() {
    // this.firestore.readProductList();
    // this.shared.initializeProductList();
  }

  get emailError(): ValidationErrors { return this.signinForm.get('email').errors; }
  get passwordError(): ValidationErrors { return this.signinForm.get('password').errors; }

  onSubmit() {

    this.isProgressing = true;

    if (this.signinForm.invalid) {
      this.isProgressing = false;
      this.notice.formError();
      return;
    }

    this.auth.signIn(this.signinForm.value)
      .then(() => {
        this.isProgressing = false;
        this.notice.signInSuccess();
        this.firestore.enableNetwork();
        this.router.navigate(['/', 'l']);
      }).catch((state) => {
        this.isProgressing = false;
        this.notice.signInError(state);
      });

  }

}
