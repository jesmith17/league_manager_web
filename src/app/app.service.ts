import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { League } from './models/league';
import { Team } from './models/team';
import { Game } from './models/game';
import { Customer } from './models/customer';
import { Division } from './models/division';
//import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  activeLeague: League;
  leagues: Observable<League[]>;

  constructor(private http: HttpClient) { }
  //configUrl = environment.apiUrl;

  getLeagues(searchParams? :any): Observable<League[]> {
    let params = new HttpParams();
    params = params.append('tenant', 'Heartland');
    params = params.append('season', '2023-2024');
    this.leagues = this.http.get<League[]>('http://localhost:3000/leagues', {params});
    return this.leagues;
  }

  getDivisionsForLeague(): Observable<Division[]> {
    return this.http.get<Division[]>(`http://localhost:3000/leagues/${this.activeLeague.id}/divisions`);
  }

  getDivisionById(divisionId: string): Observable<Division> {
    return this.http.get<Division>(`http://localhost:3000/leagues/${this.activeLeague.id}/divisions/${divisionId}`);
  }

  getCustomerByURL(url: string): Observable<Customer[]> {
    let params = new HttpParams();
    params = params.append('domain', url);
    return this.http.get<Customer[]>('http://localhost:3000/customers', {params})
  }

  getLeague(id? :any): Observable<League> {
    return this.http.get<League>(`http://localhost:3000/leagues/${id}`);
  }

  getTeamsForDivision(id? :any): Observable<Team[]> {
    let params = new HttpParams();
    params = params.append('division_id', id);
    params = params.append('league_id', this.activeLeague.id);
    return this.http.get<Team[]>('http://localhost:3000/teams', {params});
  }

  getGamesForDivision(id :any, upcoming :boolean): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('division_id', id);
    params = params.append('league_id', this.activeLeague.id);
    params = params.append('upcoming', upcoming)
    return this.http.get<Game[]>('http://localhost:3000/games', {params});
  }

  getGamesForTeam(id:any): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('team_id', id);
    return this.http.get<Game[]>('http://localhost:3000/games', {params});
  }

  getTeam(id :any): Observable<Team> {
    return this.http.get<Team>(`http://localhost:3000/teams/${id}`);
  }


  

}
