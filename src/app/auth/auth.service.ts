import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  registerNewuser(payload: any) {
    console.log(payload, 'payload');

    return this.http.post(
      this.url +'/user_registeration',
      payload
    );
  }

  loginUserS(payload: any) {
    console.log(payload, 'payload');

    return this.http.post(
      this.url + '/userlogin',
      payload
    );
  }
}
