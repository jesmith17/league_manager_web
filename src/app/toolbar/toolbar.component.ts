import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { League } from '../models/league';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit{
  
  leagueSwitchForm: FormGroup;
  leagues: Observable<League[]>;
  activeLeague: League;
  customer: Customer;

  constructor(private router: Router, private appService: AppService, private fb:FormBuilder){
    this.activeLeague = this.appService.activeLeague;
    this.customer = this.appService.customer;
  }
  
  ngOnInit(): void {
    
    this.leagueSwitchForm =  this.fb.group({
      league: [this.activeLeague.id]
    });
    this.leagues = this.appService.getLeagues();


  }

  switchLeague(leagueId: string): void {
      //const leagueId = this.leagueSwitchForm.get('league')?.value
      // THis is to ensure that they can't set it to a league they don't have. 
      this.appService.getLeague(leagueId).subscribe((league) => {
        this.appService.activeLeague = league;
        this.activeLeague = league;
        this.router.navigate(['/league'])
      })
    }
}
