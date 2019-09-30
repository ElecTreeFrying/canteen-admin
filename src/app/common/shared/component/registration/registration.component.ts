import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { EntryService } from './entry.service';
import { SharedService } from '../../../core/service/shared.service';


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
    private shared: SharedService
  ) {
    this.registrationForm = fb.group({
      'email': [ '', [ Validators.required, Validators.email ] ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'repeatPassword': [ '', [ Validators.required, this.repeatPasswordCheck.bind(this)] ],
      'firstName': [ '', [ Validators.required, Validators.minLength(2), CustomValidator.containNum ] ],
      'lastName': [ '', [ Validators.required, Validators.minLength(2), CustomValidator.containNum ] ],
      // 'employeeId': [ '', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ] ]
      'employeeId': [ '', [ Validators.maxLength(10) ] ]
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
    
    this.shared.openSnack({
      duration: 3500,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Please wait.'
    })
    
    if (this.registrationForm.invalid) {
      this.isProgressing = false;
      
      this.shared.snack.dismiss()
      this.shared.openSnack({
        duration: 3500,
        horizontal: 'center',
        vertical: 'bottom',
        message: 'Invalid form please try again.'
      })
      return;
    }

    this.entry.createNewUser(this.registrationForm.value)
      .then(() => {
        
        this.isProgressing = false;
        this.router.navigate(['/', 'a']);
        
        this.shared.snack.dismiss()
        this.shared.openSnack({
          duration: 1500,
          horizontal: 'center',
          vertical: 'bottom',
          message: 'Successfully created an account.'
        })
        setTimeout(() => {
          this.shared.openSnack({
            duration: 3500,
            horizontal: 'center',
            vertical: 'bottom',
            message: 'Logged in successfully.'
          })
        }, 1500);
      }).catch((e) => {
        
        this.isProgressing = false;
        this.registrationForm.reset();
        
        this.shared.snack.dismiss()
        this.shared.openSnack({
          duration: 3500,
          horizontal: 'center',
          vertical: 'bottom',
          message: e['message']
        })
      });
  }

}

export class CustomValidator {
  static containNum(control: AbstractControl) {
    const CONTAIN_NUMBER_REGEXP: RegExp = /\d/;
    return CONTAIN_NUMBER_REGEXP.test(control.value) ? { containsNumber: true } : null;
  }
}
