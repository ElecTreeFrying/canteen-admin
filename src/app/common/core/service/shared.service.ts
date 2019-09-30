import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import * as Chance from 'chance';

import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

export interface Snack {
  message: string;
  duration: number;
  horizontal: MatSnackBarHorizontalPosition,
  vertical: MatSnackBarVerticalPosition,
  class?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public snack: MatSnackBar
  ) { }

  openSnack(option: Snack) {
    return this.snack.open(option.message, 'X', this.config(option));
  }
  
  private config(option: Snack) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = option.vertical;
    config.horizontalPosition = option.horizontal;
    config.duration = option.duration;
    config.panelClass = option.class;
    return config;
  }
  
  get randomHash() {
    
    const chance = new Chance();
    return Chance().hash({ length: 25 })
  }
  
}
