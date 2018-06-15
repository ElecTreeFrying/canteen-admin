import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auth: AngularFireAuth) {
    console.log('dashboard-guard');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.authState.pipe(
      map((user: any) => {
        user === null ? this.router.navigate(['/']) : 0;
        return user !== null;
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

@Injectable({
  providedIn: 'root'
})
export class EntryGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private auth: AngularFireAuth) {
    console.log('entry-guard');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.authState.pipe(
      map((user: any) => {
        user === null ? 0 : this.router.navigate(['/', 'l']);
        return user === null;
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
