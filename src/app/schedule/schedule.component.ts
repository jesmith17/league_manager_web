import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Division } from '../models/division';
import { Game } from '../models/game';
import { League } from '../models/league';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit, AfterViewInit {

  division_id?: any;
  league_id?: any;
  @Input() division: Observable<Division>;
  league?: League;
  games = new MatTableDataSource<Game>;
  upcoming:boolean = true;
  showGames = false;
  
  @ViewChild('gameSort') gameSort: MatSort;
  
  gameColumns = ['home','away','game_time','venue','field']
  
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService){}
    
    
    ngOnInit(): void {
      this.league = this.appService.activeLeague
      
      this.division.subscribe(division => {
        this.appService.getGamesForDivision(division.id, this.upcoming).subscribe(games => {
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
