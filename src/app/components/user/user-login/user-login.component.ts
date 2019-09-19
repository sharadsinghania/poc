import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginFormGrp: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _session: SessionStorageService) { }

  ngOnInit() {
    this.createForm();
  }

  get userid() {
    return this.loginFormGrp.get('userid');
  }

  get password() {
    return this.loginFormGrp.get('password');
  }

  createForm() {
    this.loginFormGrp = this._fb.group({
      userid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginSubmit() {
    if (this.CheckUserDetails()) {
      var user = new User();
      user.userid = this.userid.value;
      user.password = this.password.value;

      this._userService.AuthUser(user).subscribe((resp: boolean) => {
        if (resp) {
          //implement store here to save user information and redirect to the user profile page.
          this._session.set('UserDetail', resp);
          this._router.navigate(['/profile']);
        }
        else {
          //Display error message to the user and keep him/her to the login page.
          this._router.navigate(['/']);
        }
      });
    }
  }

  CheckUserDetails() {
    if (!this.userid.value || !this.password.value)
      return false;
    return true;
  }
}
