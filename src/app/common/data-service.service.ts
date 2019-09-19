import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  httpGet(url: string): Observable<any> {
    return this._http.get(url);
  }

  httpPost(url: string, obj: any) : Observable<any> {
    return this._http.post<any>(url, obj, this.httpOptions);
  }
}