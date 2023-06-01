import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(this.baseUrl + "Account/getAllUser")
  }
}
