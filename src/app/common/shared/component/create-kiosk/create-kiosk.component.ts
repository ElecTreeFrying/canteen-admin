import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { DatabaseService } from '../../../core/service/database.service';
import { SharedService } from '../../../core/service/shared.service';

@Component({
  selector: 'app-create-kiosk',
  templateUrl: './create-kiosk.component.html',
  styleUrls: ['./create-kiosk.component.scss']
})
export class CreateKioskComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private dialog: MatDialog,
    private database: DatabaseService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'id': [ '', [ Validators.required, Validators.minLength(4) ] ],
      'pin': [ '', [ Validators.required, Validators.minLength(4) ] ],
      'name': [ '', [ Validators.required, Validators.minLength(2) ] ],
    })
  }
  
  get usernameError() { return this.form.get('id').errors }
  get passwordError() { return this.form.get('pin').errors }
  get nameError() { return this.form.get('name').errors }

  ngOnInit() {
  }
  
  onSubmit() {
    const doc = this.form.value;
    this.database.pushThis(doc, 'users-kiosk')
    
    this.shared.openSnack({
      duration: 3500,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Successfully added new kiosk user.'
    })
    
    this.dialog.closeAll();
  }

}
