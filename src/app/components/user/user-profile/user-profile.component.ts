import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  loggedInUser: User;

  constructor(private _sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.loggedInUser =  this._sessionStorage.get('UserDetail');
  }
}
