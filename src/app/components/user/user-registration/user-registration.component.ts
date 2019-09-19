import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  IsFormValid: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _session: SessionStorageService) { }

  ngOnInit() {
    this.createForm();
  }

  get userid() {
    return this.userRegistrationForm.get('userid');
  }

  get password() {
    return this.userRegistrationForm.get('password');
  }

  get firstName() {
    return this.userRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.userRegistrationForm.get('lastName');
  }

  createForm() {
    this.userRegistrationForm = this._fb.group({
      userid: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobile: '',
      location: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      id: 0
    });
  }

  register() {
    var user = new User();
    this.IsFormValid = this.userRegistrationForm.valid;
    if (this.IsFormValid) {
      user.userid = this.userid.value;
      user.firstName = this.firstName.value;
      user.lastName = this.lastName.value;
      user.mobile = this.userRegistrationForm.get('mobile').value;
      user.location = this.userRegistrationForm.get('location').value;
      user.password = this.password.value;
      this._userService.getMaxUserId().subscribe(p => {
        user.id = p;
        this._userService.addUser(user).subscribe((p: User) => {
          if (p.id == user.id) {
            this._session.set('UserDetail', p);
            this._router.navigate(['/profile']);
          }
        });
      });
    }
  }

}
