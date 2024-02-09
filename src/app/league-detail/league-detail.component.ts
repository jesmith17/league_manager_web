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
games = new MatTableDataSource<Game>;
upcoming:boolean = true;
showGames = false;

@ViewChild('gameSort') gameSort: MatSort;

gameColumns = ['home','away','game_time','venue','field']

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService){}
  
  
  ngOnInit(): void {
    this.league = this.appService.activeLeague
    
    this.activatedRoute.params.subscribe(params => {
      this.division_id = params['id'];
      this.selectedDivision = this.appService.getDivisionById(this.division_id);
      this.appService.getGamesForDivision(this.division_id, this.upcoming).subscribe(games => {
        this.games.data = games;
        this.showGames = true;
      })
    })
  }

 ngAfterViewInit(): void {
   
  
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
  
  this.games.sort = this.gameSort;

  
 }


 
 



}
