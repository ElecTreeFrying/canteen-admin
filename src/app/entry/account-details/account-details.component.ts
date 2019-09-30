import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthService } from '../../common/core/service/auth.service';
import { DatabaseService } from '../../common/core/service/database.service';
import { SharedService } from '../../common/core/service/shared.service';

import { CreateKioskComponent } from '../../common/shared/component/create-kiosk/create-kiosk.component';
import { ListKioskComponent } from '../../common/shared/component/list-kiosk/list-kiosk.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  image: string = 'https://api.adorable.io/avatars/285/'
  option: any = {
    isImageLoading: false,
    imageOptionBuffer: false
  };
  data: any;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private database: DatabaseService,
    private shared: SharedService,
  ) { }

  ngOnInit() {
    this.initialize();
    this.refresh();
  }
  
  ngOnDestroy() {
    this.shared.snack.dismiss();
  }
  
  generateAvatar() {
    const url = `${this.image}${this.shared.randomHash}.png`;
    
    this.auth.updatePhotoURL(url).subscribe(() => 0);
    this.option.isImageLoading = true;
    setTimeout(() => { this.refresh(); }, 1000);

    this.shared.openSnack({
      duration: 999999999,
      horizontal: 'center',
      vertical: 'bottom',
      message: 'Generating new image.'
    })
  }
  
  createKiosk() {
    this.dialog.open(CreateKioskComponent, { data: '' });
  }
  
  listKioskAccount() {
    this.dialog.open(ListKioskComponent, { data: '' });
  }
  
  imageLoaded() {
    
    if (!this.option.imageOptionBuffer) {
      this.option.imageOptionBuffer = true;
    } else {
      this.option.isImageLoading = false;
      this.shared.openSnack({
        duration: 3500,
        horizontal: 'center',
        vertical: 'bottom',
        message: 'New image generated.'
      })
    }
  }
  
  private initialize() {
    this.option.isImageLoading = false;
    this.shared.snack.dismiss();
  }
  
  private refresh() {
    this.database.currentUser.subscribe((res: any) => {
      this.data = res;
    });
  }
  
}
