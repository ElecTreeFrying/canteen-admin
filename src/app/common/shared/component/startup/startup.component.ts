import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder) {
    this.form = fb.group({
      'email': [ '' ],
      'password': [ '' ]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
