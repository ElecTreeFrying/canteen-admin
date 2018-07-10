import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppProviderModule  } from './app-provider.module';

import { StartupComponent } from './common/shared/component/startup/startup.component';

const routes: Routes = [
  { path: '', component: StartupComponent, canActivate: [  ] },
  { path: 'a', loadChildren: './entry/entry.module#EntryModule', canActivate: [  ] }
];

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }

@NgModule({
  declarations: [
    AppComponent,
    StartupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AppProviderModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
