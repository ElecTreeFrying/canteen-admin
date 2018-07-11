import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EntryMaterialModule } from '../common/core/module/entry-material.module';

import { AuthService } from '../common/core/service/auth.service';

import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-entry',
  templateUrl: 'entry.component.html',
  styleUrls: [ 'entry.component.scss' ]
})
export class EntryComponent {
  constructor(private auth: AuthService) {}
  onSignout() {
    this.auth.signOut();
  }
}

const routes: Routes = [
  { path: '', component: EntryComponent, children: [
    { path: '', component: MainComponent },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'account', loadChildren: './account-details/account-details.module#AccountDetailsModule' },
    { path: 'preference', loadChildren: './preferences/preferences.module#PreferencesModule' },
    { path: 'help', loadChildren: './help/help.module#HelpModule' }
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EntryMaterialModule
  ],
  declarations: [
    EntryComponent,
    MainComponent
  ]
})
export class EntryModule { }
