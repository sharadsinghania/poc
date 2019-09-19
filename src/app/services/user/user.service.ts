import { Injectable } from '@angular/core';
import { DataServiceService } from 'src/app/common/data-service.service';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userTemp: User[];
  private _userURL: string = 'http://localhost:3000/users';

  constructor(private dataService: DataServiceService) { }

  //Check user Authentication
  AuthUser(user: User): Observable<boolean> {
    return this.dataService.httpGet(this._userURL).pipe(map(
      (resp: any) => {
        this.userTemp = resp;
        var filteredUser = this.userTemp.find(p =>
          p.userid == user.userid && p.password == user.password);
        if (filteredUser)
          return true;
        return false;
      }
    ));
  }

  //Add user to the json file
  addUser(user: User): Observable<User> {
    return this.dataService.httpPost(this._userURL, user).pipe(
      map(p => {
        var userTemp: User;
        userTemp = p;
        return userTemp;
      })
    );
  }

  //Fetch the max user id
  getMaxUserId(): Observable<number> {
    return this.dataService.httpGet(this._userURL).pipe(map(
      (resp: any) => {
        this.userTemp = resp;
        var sortedUSer = this.userTemp.sort((a, b) => { return b.id - a.id })[0];
        return ((sortedUSer && sortedUSer.id ? sortedUSer.id : 0) + 1);
      }
    ));
  }

}