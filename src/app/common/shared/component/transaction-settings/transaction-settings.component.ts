import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';


@Component({
  selector: 'app-transaction-settings',
  templateUrl: './transaction-settings.component.html',
  styleUrls: ['./transaction-settings.component.scss']
})
export class TransactionSettingsComponent implements OnInit {

  @ViewChild('expansionPanel') panel: MatExpansionPanel;

  constructor() { }

  ngOnInit() {
    this.panel.open();
  }

}
