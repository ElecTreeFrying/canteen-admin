import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { DatabaseService } from '../../../core/service/database.service';

@Component({
  selector: 'app-test-device-add',
  templateUrl: './test-device-add.component.html',
  styleUrls: ['./test-device-add.component.scss']
})
export class TestDeviceAddComponent implements OnInit {

  posData: FormGroup;
  posValue: any = {
    value: '//',
    code: '',
    quantity: '',
    mode: ''
  }

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private dialog: MatDialog,
    private database: DatabaseService
  ) {
    this.posData = fb.group({
      'pos': [ '' ],
      'code': [ '' ],
      'quantity': [ '' ],
      'mode': [ '' ],
    })
  }

  ngOnInit() {
    this.posData.get('pos').disable()

    let code = this.posValue.code;
    let quantity = this.posValue.quantity;
    let mode = this.posValue.mode;

    this.posData.get('code').valueChanges.subscribe((data) => {
      code = data;
      this.posValue.value = `${code}/${quantity}/${mode}`
    });

    this.posData.get('quantity').valueChanges.subscribe((data) => {
      quantity = data;
      this.posValue.value = `${code}/${quantity}/${mode}`
    });

    this.posData.get('mode').valueChanges.subscribe((data) => {
      mode = data;
      this.posValue.value = `${code}/${quantity}/${mode}`
    });
  }

  onPost() {
    this.dialog.closeAll();

    const form = this.posData.value;

    this.database.test_manualPostData(form);
  }

}
