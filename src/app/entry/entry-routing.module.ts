import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryComponent } from './entry.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { EntryGuard, DashboardGuard } from '../common/shared/guard/guard';

const routes: Routes = [
  { path: '', component: EntryComponent, children: [
    { path: '', component: LandingPageComponent, canActivate: [ EntryGuard ] },
    { path: 'registration', loadChildren: './registration/registration.module#RegistrationModule', canActivate: [ EntryGuard ] },
    { path: 'l', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [ DashboardGuard ] }
  ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
