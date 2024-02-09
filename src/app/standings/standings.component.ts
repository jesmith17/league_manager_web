import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { Team } from '../models/team';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Division } from '../models/division';
import { League } from '../models/league';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.sass']
})




export class StandingsComponent implements OnInit{

  division_id?: any;
  league_id?: any;
  @Input() division: Observable<Division>;
  teams = new MatTableDataSource<Team>;
  league?: League;
  upcoming:boolean = true;
  showTeams = false;
  
  teamsColumns = ['name','sm-result','wins','losses','draws','gf','ga','gd','pts']

  @ViewChild('teamSort') teamSort: MatSort;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService){

  }
  

  ngOnInit(): void {
    this.league = this.appService.activeLeague
    
    this.division.subscribe(division => {
      this.appService.getTeamsForDivision(division.id).subscribe(teams => {
        this.teams.data = teams;
        this.showTeams = true;
  
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
  
  
  this.teams.sort = this.teamSort;
  

  
 }

}
