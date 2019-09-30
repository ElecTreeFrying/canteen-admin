import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../../../core/service/auth.service';
import { DatabaseService } from '../../../core/service/database.service';
import { StorageService } from '../../../core/service/storage.service';
import { SharedService } from '../../../core/service/shared.service';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.scss']
})
export class ChangePhotoComponent implements OnInit {

  user: any;
  form: FormGroup;
  
  url: string = 'https://api.adorable.io/avatars/285/'
  image: any;
  
  isURL: boolean = false;
  isWaiting: boolean = false;
  
  isPhoto: boolean = false;
  isLink: boolean = false;
  isCached: boolean = false;
  
  count: number = 0;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private auth: AuthService,
    private database: DatabaseService,
    private storage: StorageService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'input': [ '' ],
    })
  }

  ngOnInit() {
    this.openCached();

    this.count = 0;
    this.user = this.database.currentUser;

    this.form.get('input').valueChanges.subscribe((res) => {
      this.image = res;
      
      if (res.length > 0) {
        this.openLink();
      }
      
    });
  }
  
  photo(event: Event) {
    this.count++;
    this.isWaiting = true;
    this.openPhoto();
    this.snackWait();
    
    const file = event.target['files'][0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
      
      this.storage.uploadFile(file).then((downloadURL: string) => {
        
        this.auth.updatePhotoURL(downloadURL).subscribe(() => {
          setTimeout(() => {
            this.user = this.database.currentUser;
            this.change();
            this.cancel();
          }, 1000);
        })
      })
    }
  }
  
  link() {
    this.isURL = true;
    this.openLink();
  }
  
  cached() {
    this.count++;
    this.isWaiting = true;
    this.openCached();
    
    this.snackWait();
    const image = this.url + this.shared.randomHash;

    this.auth.updatePhotoURL(image).subscribe(() => {
      setTimeout(() => { this.user = this.database.currentUser; }, 1000);
    })
  }
  
  update() {
    this.count++;
    this.isWaiting = true;
    
    this.snackWait();
    const image = this.form.value['input'];
    
    this.auth.updatePhotoURL(image).subscribe(() => {
      setTimeout(() => {
        this.user = this.database.currentUser;
        this.change();
        this.cancel();
      }, 1000);
    })
  }
  
  cancel() {
    this.isURL = false;
    this.openCached();
  }
  
  change() {
    if (this.count === 0) return;
    this.isWaiting = false;
    this.shared.openSnack({
      duration: 3500,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Display photo successfully changed.'
    });
  }
  
  private snackWait() {
    this.shared.openSnack({
      duration: 999999999,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Please wait.'
    });
  }
  
  private openPhoto() {
    this.isPhoto = true;
    this.isLink = false;
    this.isCached = false;
  }
  
  private openLink() {
    this.isPhoto = false;
    this.isLink = true;
    this.isCached = false;
  }
  
  private openCached() {
    this.isPhoto = false;
    this.isLink = false;
    this.isCached = true;
  }

}
