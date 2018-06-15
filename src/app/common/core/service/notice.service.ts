import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackbar: MatSnackBar) { }

  formError() {
    let config = new MatSnackBarConfig();
    config.duration = 2500;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackbar.open('Form error. Please try again.', '', config);
  }

  signInSuccess() {
    const message = 'Successfully signed in';
    let config = new MatSnackBarConfig();
    config.duration = 3500;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackbar.open(message, '', config)
      .afterDismissed().subscribe(() => {
        const message = 'Welcome to Logger Dashboard ';
        this.snackbar.open(message, '', config);
      });
  }

  signInError(error: any) {
    let config = new MatSnackBarConfig();
    config.duration = 7000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackbar.open(error.message, '', config);
  }

  signUpSuccess(name: string) {
    let config = new MatSnackBarConfig();
    config.duration = 3500;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackbar.open(`Welcome ${name}!`, '', config)
      .afterDismissed().subscribe(() => {
        const message = 'Welcome to Logger Dashboard ';
        this.snackbar.open(message, '', config);
      });
  }

  signUpError(error: any) {
    let config = new MatSnackBarConfig();
    config.duration = 7000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackbar.open(error.message, '', config);
  }

}
