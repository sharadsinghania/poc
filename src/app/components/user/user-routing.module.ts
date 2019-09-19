import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CanActivateService } from 'src/app/common/can-activate.service';
import { CanDeactivateService } from 'src/app/common/can-deactivate.service';

const routes: Routes = [
  {
    path: "", component: UserLoginComponent
  },
  {
    path: "register", component: UserRegistrationComponent,
    canDeactivate: [CanDeactivateService]
  },
  {
    path: "login", component: UserLoginComponent
  },
  {
    path: "profile", component: UserProfileComponent, canActivate: [CanActivateService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
