import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Team } from '../models/team';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from '../models/game';
import { Result } from '../models/result';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.sass']
})
export class TeamDetailComponent implements OnInit{
  
  id: any | undefined;
  team: Observable<Team>;
  games = new MatTableDataSource<Result>();
  schedule = new MatTableDataSource<Game>();

  faCheck = faCheck;
  displayedColumns = ['opponent_name','result','sm-result','score','opponent_score','date','venue','field']
  scheduleColumns = ['opponent_name','game_time','venue','field']


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.team = this.appService.getTeam(this.id)
      
      this.team.subscribe(team => {
        this.games.data = team.results;
      })

      this.appService.getGamesForTeam(this.id).subscribe(games => {
        this.schedule.data = games;
      });
      
    });
  }





}
