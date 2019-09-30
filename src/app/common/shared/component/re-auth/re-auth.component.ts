import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../../core/service/auth.service';
import { SharedService } from '../../../core/service/shared.service';

@Component({
  selector: 'app-re-auth',
  templateUrl: './re-auth.component.html',
  styleUrls: ['./re-auth.component.scss']
})
export class ReAuthComponent implements OnInit {
  
  form: FormGroup;
  isDisabled: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) public fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'email': [ '' ],
      'password': [ '' ],
    })
  }

  ngOnInit() {
  }
  
  onSubmit() {
    
    const email = this.form.value['email'];
    const password = this.form.value['password'];
    const item = this.data.item;
    this.isDisabled = true;
    
    this.shared.openSnack({
      duration: 999999999,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Please wait.'
    })

    if (this.data.option === 'email') {
      this.auth.updateEmail({ email, password, newEmail: item }).then(() => {
        this.dialog.closeAll();
      });
    } else if (this.data.option === 'password') {
      this.auth.updatePassword({ email, password, newPassword: item }).then(() => {
        this.dialog.closeAll();
      });
    } else if (this.data.option === 'delete') {
      
      confirm('Are you sure you want to delete your account?')
        ? this.auth.deleteAccount({ email, password }).then(() => {
          this.dialog.closeAll();
        })
        : (() => {
          this.dialog.closeAll();
          this.shared.snack.dismiss();
        })()
      
    }
    
  }

}
