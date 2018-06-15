import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { EntryService } from '../entry.service';
import { NoticeService } from '../../common/core/service/notice.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  password: string = '123123';
  isProgressing: boolean = false;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,
    private entry: EntryService,
    private notice: NoticeService
  ) {
    this.registrationForm = fb.group({
      'email': [ '', [ Validators.required, Validators.email ] ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'repeatPassword': [ '', [ Validators.required, this.repeatPasswordCheck.bind(this)] ],
      'firstName': [ '', [ Validators.required, Validators.minLength(2), CustomValidator.containNum ] ],
      'lastName': [ '', [ Validators.required, Validators.minLength(2), CustomValidator.containNum ] ],
      'employeeId': [ '', [ Validators.required ] ]
    })
  }

  ngOnInit() {
    this.registrationForm.valueChanges.subscribe((response) => {
      this.password = response.password;
    });
  }

  repeatPasswordCheck(control: AbstractControl): ValidationErrors {
    const condition = control.value === this.password;
    return condition ? null : { isNotMatched: true };
  }

  get emailError(): ValidationErrors { return this.registrationForm.get('email').errors; }
  get passwordError(): ValidationErrors { return this.registrationForm.get('password').errors; }
  get repeatPasswordError(): ValidationErrors { return this.registrationForm.get('repeatPassword').errors; }
  get firstNameError(): ValidationErrors { return this.registrationForm.get('firstName').errors; }
  get lastNameError(): ValidationErrors { return this.registrationForm.get('lastName').errors; }
  get employeeIdError(): ValidationErrors { return this.registrationForm.get('employeeId').errors; }

  onSubmit() {

    this.isProgressing = true;

    if (this.registrationForm.invalid) {
      this.isProgressing = false;
      this.notice.formError();
      return;
    }

    this.entry.createNewUser(this.registrationForm.value)
      .then((data: any) => {
        this.isProgressing = false;
        this.notice.signUpSuccess(`${data.user.firstName} ${data.user.lastName}`);
        this.router.navigate(['/', 'l']);
      }).catch((state) => {
        this.isProgressing = false;
        this.notice.signUpError(state);
        this.registrationForm.reset();
      });

  }


}

export class CustomValidator {
  static containNum(control: AbstractControl) {
    const CONTAIN_NUMBER_REGEXP: RegExp = /\d/;
    return CONTAIN_NUMBER_REGEXP.test(control.value) ? { containsNumber: true } : null;
  }
}
