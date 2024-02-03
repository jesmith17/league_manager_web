import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Game } from '../models/game';
import { League } from '../models/league';
import { Team } from '../models/team';
import { Division } from '../models/division';
import { MatTableDataSource } from '@angular/material/table';
import { Participant } from '../models/participant';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.sass']
})
export class LeagueDetailComponent implements OnInit, AfterViewInit{

division_id?: any;
league_id?: any;
selectedDivision: Observable<Division>;
league?: League;
teams = new MatTableDataSource<Team>;
games = new MatTableDataSource<Game>;
upcoming:boolean = true;
showTeams = false;
showGames = false;

@ViewChild('teamSort') teamSort: MatSort;
@ViewChild('gameSort') gameSort: MatSort;

teamsColumns = ['name','sm-result','wins','losses','draws','gf','ga','gd','pts']
gameColumns = ['home','away','game_time','venue','field']

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService){}
  
  
  ngOnInit(): void {
    this.league = this.appService.activeLeague
    
    this.activatedRoute.params.subscribe(params => {
      this.division_id = params['id'];
      this.selectedDivision = this.appService.getDivisionById(this.division_id);
      this.appService.getTeamsForDivision(this.division_id).subscribe(teams => {
        this.teams.data = teams;
        this.showTeams = true;
  
      })
      this.appService.getGamesForDivision(this.division_id, this.upcoming).subscribe(games => {
        this.games.data = games;
        this.showGames = true;
      })
    })
  }

 ngAfterViewInit(): void {
   this.teams.sortingDataAccessor = (item, property) => {
    switch(property) {
      case 'name':  console.log(property); return item.name;
      case 'wins': return item.record.wins; 
      case 'losses': return item.record.losses;
      case 'draws': return item.record.draws; 
      case 'gf': return item.record.goals_for;
      case 'ga': return item.record.goals_allowed;
      case 'gd': return item.record.goal_differential;
      case 'pts': return item.record.points;
      default: return item.name;
    }
  };
  
  this.games.sortingDataAccessor = (item, property) => {
    switch(property) {
      case 'home': return item.home_team_name;
      case 'away': return item.away_team_name; 
      case 'game_time': return new Date(item.game_time).getTime();
      case 'venue': return item.venue.name;
      case 'field': return item.field;
      default: return 0;
    }
  };
  this.teams.sort = this.teamSort;
  this.games.sort = this.gameSort;

  
 }


 
 



}
