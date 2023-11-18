import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// http injection
  constructor( private http: HttpClient) { }

  private url = 'http://127.0.0.1:3001/author/';

  register( author: any){

    return this.http.post(this.url + 'register' , author);
  }
}
