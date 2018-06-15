import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AccountModule } from './account/account.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: MainComponent },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'dashboard', loadChildren: './transactions/transactions.module#TransactionsModule' },
    { path: 'preferences', loadChildren: './preferences/preferences.module#PreferencesModule' },
    { path: 'help', loadChildren: './help/help.module#HelpModule' }
  ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
