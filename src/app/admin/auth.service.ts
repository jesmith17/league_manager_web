import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  public user?: User;
  private token?: string |  null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
  }

  login(username: string, password: string): Observable<boolean> {
    const expandedHeaders = this.prepareHeader();
    return this.http.post(environment.apiUrl + '/login', {user: {email: username, password: password}}, expandedHeaders)
      .pipe(
        map((resp: any) => {
          const headers = resp.headers.get('Authorization').split(' ');
          const token = headers[headers.length - 1 ];
          if (token != null) {
            this.token = token;
            localStorage.setItem('currentUser', token);
            this.user = resp.body;
            return true;
          } else {
            return false;
          }
        })
      );
  }






  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  public hasValidToken(): boolean {
    console.log(this.token)
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }


  private prepareHeader(): object {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    return {
      headers: headers,
      observe: 'response'
    };
  }


}
