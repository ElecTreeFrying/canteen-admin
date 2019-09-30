import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { DatabaseService } from '../../common/core/service/database.service';
import { SharedService } from '../../common/core/service/shared.service';

import { ReAuthComponent } from '../../common/shared/component/re-auth/re-auth.component';
import { ChangePhotoComponent } from '../../common/shared/component/change-photo/change-photo.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  form: FormGroup;
  password: string = '';
  bool: any = {
    emailError: false,
    firstNameError: false,
    lastNameError: false,
    employeeIdError: false,
    confirmError: false
  }

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private dialog: MatDialog,
    private database: DatabaseService,
    private shared: SharedService,
  ) {
    this.form = fb.group({
      'email': [ '', [ Validators.email ] ],
      'id': [ '', [ Validators.minLength(10), Validators.maxLength(10) ] ],
      'password': [ '', [ Validators.minLength(6) ] ],
      'confirm': [ '', [ this.repeatPasswordCheck.bind(this) ] ],
      'firstName': [ '', [ Validators.minLength(2) ] ],
      'lastName': [ '', [ Validators.minLength(2) ] ],
    })
  }
  
  get emailError(): ValidationErrors { return this.form.get('email').errors; }
  get employeeIdError(): ValidationErrors { return this.form.get('id').errors; }
  get passwordError(): ValidationErrors { return this.form.get('password').errors; }
  get confirmError(): ValidationErrors { return this.form.get('confirm').errors; }
  get firstNameError(): ValidationErrors { return this.form.get('firstName').errors; }
  get lastNameError(): ValidationErrors { return this.form.get('lastName').errors; }

  ngOnInit() {
    this.form.valueChanges.subscribe((response) => {
      this.password = response.password;
    });
    
    this.form.get('email').statusChanges.subscribe((response) => {
      this.bool.emailError = response === 'INVALID';
    });
    
    this.form.get('id').statusChanges.subscribe((response) => {
      this.bool.employeeIdError = response === 'INVALID';
    });
    
    this.form.get('firstName').statusChanges.subscribe((response) => {
      this.bool.firstNameError = response === 'INVALID';
    });
    
    this.form.get('lastName').statusChanges.subscribe((response) => {
      this.bool.lastNameError = response === 'INVALID';
    });
    
    this.form.get('confirm').statusChanges.subscribe((response) => {
      this.bool.confirmError = response === 'INVALID';
    });
  }
  
  repeatPasswordCheck(control: AbstractControl): ValidationErrors {
    const condition = control.value === this.password;
    return condition ? null : { isNotMatched: true };
  }
  
  post(option: string) {
    
    switch(option) {
      case 'email': {
        const email = this.form.value['email']
        if (email.length === 0) { this.emptySnack() }
        else {
          this.dialog.open(ReAuthComponent, { data: { item: email, option: 'email' } })
            .afterClosed().subscribe(() => {
              this.form.patchValue({ email: '' });
            });
        }
        break;
      }
      case 'password': {
        const password = this.form.get('password').value.length;
        const confirmLength = this.form.get('confirm').value.length;
        const confirmStatus = this.form.get('confirm').invalid;
        const item = this.form.value['password']
        
        if (password === 0) { this.emptySnack() }
        else if (confirmLength === 0 || confirmStatus) { this.shared.openSnack({
          duration: 3500,
          horizontal: 'center',
          vertical: 'bottom',
          message: 'Password does not matched.'
        }) }
        else {
          this.dialog.open(ReAuthComponent, { data: { item, option: 'password' } })
            .afterClosed().subscribe(() => {
              this.form.patchValue({ password: '', confirm: '' });
            });
        }
        break;
      }
      case 'delete': {
        this.dialog.open(ReAuthComponent, { data: { item: '', option: 'delete' } })
        break;
      }
      case 'photo': {
        this.dialog.open(ChangePhotoComponent, { data: '' });
        break;
      }
      case 'id': {
        const id = this.form.value['id']
        if (id.length === 0) { this.emptySnack() }
        else {
          this.database.updateEmployeeID(id);
          this.form.patchValue({ id: '' });
          this.successfulSnack();
        }
        break;
      }
      case 'firstname': {
        const name = this.form.value['firstName']
        if (name.length === 0) { this.emptySnack() }
        else {
          this.database.updateFirstName(name);
          this.form.patchValue({ firstName: '' });
          this.successfulSnack();
        }
        break;
      }
      case 'lastname': {
        const name = this.form.value['lastName']
        if (name.length === 0) { this.emptySnack() }
        else {
          this.database.updateLastName(name);
          this.form.patchValue({ lastName: '' });
          this.successfulSnack();
        }
        break;
      }
      default: break;
    }
    
  }
  
  private emptySnack() {
    this.shared.openSnack({
      duration: 3500,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Empty field.'
    })
  }
  
  private successfulSnack() {
    this.shared.openSnack({
      duration: 3500,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Updated successfully.'
    })
  }
  
}
