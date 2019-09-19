import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private _sessionStorage: SessionStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var user: User = this._sessionStorage.get('UserDetail');
    if (user)
      return true;
    this.router.navigate(['/']);
    return false;
  }
}
