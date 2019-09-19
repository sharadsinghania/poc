import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { UserRegistrationComponent } from '../components/user/user-registration/user-registration.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService implements CanDeactivate<UserRegistrationComponent> {

  constructor(private _router: Router) { }

  canDeactivate(component: UserRegistrationComponent): boolean {
    if (component.userRegistrationForm.dirty) {
      if (confirm("Are you sure want to leave this page?")) {
        return true;
      }
      else {
        this._router.navigate(['/Register']);
        return false;
      }
    }
    return true;
  }
}
