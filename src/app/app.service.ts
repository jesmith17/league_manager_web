import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { League } from './models/league';
import { Team } from './models/team';
import { Game } from './models/game';
import { Customer } from './models/customer';
import { Division } from './models/division';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  activeLeague: League;
  leagues: Observable<League[]>;
  customer: Customer;

  constructor(private http: HttpClient, private router: Router) { }
  apiUrl = environment.apiUrl;

  getLeagues(): Observable<League[]> {
    let params = new HttpParams();
    params = params.append('customer_id', this.customer.id);
    this.leagues = this.http.get<League[]>(`${this.apiUrl}/leagues`, {params});
    return this.leagues;
  }

  getLeague(id? :any): Observable<League> {
    let params = new HttpParams();
    params = params.append('customer_id', this.customer.id);
    return this.http.get<League>(`${this.apiUrl}/leagues/${id}`, {params});
  }


  

  getDivisionsForLeague(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.apiUrl}/leagues/${this.activeLeague.id}/divisions`);
  }

  getDivisionById(divisionId: string): Observable<Division> {
    return this.http.get<Division>(`${this.apiUrl}/leagues/${this.activeLeague.id}/divisions/${divisionId}`);
  }

  getCustomerByURL(url: string): Observable<Customer[]> {
    let params = new HttpParams();
    params = params.append('domain', url);
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`, {params})
  }

  

  getTeamsForDivision(id? :any): Observable<Team[]> {
    let params = new HttpParams();
    params = params.append('division_id', id);
    params = params.append('league_id', this.activeLeague.id);
    return this.http.get<Team[]>(`${this.apiUrl}/teams`, {params});
  }

  getGamesForDivision(id :any, upcoming :boolean): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('division_id', id);
    params = params.append('league_id', this.activeLeague.id);
    params = params.append('upcoming', upcoming)
    return this.http.get<Game[]>(`http://localhost:3000/games`, {params});
  }

  getGamesForTeam(id:any): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('team_id', id);
    return this.http.get<Game[]>(`${this.apiUrl}/games`, {params});
  }

  getTeam(id :any): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/teams/${id}`);
  }


  

}
