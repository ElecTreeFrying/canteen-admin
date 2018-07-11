import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

import { AppProviderModule  } from './app-provider.module';

import { StartupComponent } from './common/shared/component/startup/startup.component';

import { AuthService } from './common/core/service/auth.service';
import { EntryGuard, ExitGuard } from './common/core/service/route-guard.service';

const routes: Routes = [
  { path: '', component: StartupComponent, canActivate: [ ExitGuard ] },
  { path: 'registration', loadChildren: './common/shared/component/registration/registration.module#RegistrationModule', canActivate: [ ExitGuard ] },
  { path: 'a', loadChildren: './entry/entry.module#EntryModule', canActivate: [ EntryGuard ] }
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
  providers: [
    AuthService,
    EntryGuard,
    ExitGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.state.pipe(
      map((user: any) => user !== null)
    ).subscribe((state) => {
      state ? this.router.navigate(['/', 'a']) : this.router.navigate(['/']);
    });
  }

}
