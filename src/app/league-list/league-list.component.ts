import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Division } from '../models/division';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.sass']
})
export class LeagueListComponent implements OnInit, AfterViewInit{
  
  activeLeague: League;
  hasCurrentLeague: boolean;
  leagueId: string;
  leagues = new MatTableDataSource<Division>;

  @ViewChild('divisionSort') divisionSort: MatSort;
  
  
  filterForm: FormGroup;
  leagueTypes = [{value:"Premier", display: "Premier"}, {value:"rec", display:"Recreational"}]
  sports = [{value:"soccer", display: "Soccer"}, {value:"futsal", display:"Futsal"}]
  ageValues = [
      {value:"U-6", display: "U-6"}, 
      {value:"U-7", display: "U-7"},
      {value:"U-8", display: "U-8"},
      {value:"U-9", display: "U-9"},
      {value:"U-10", display: "U-10"},
      {value:"U-11", display: "U-11"},
      {value:"U-12", display: "U-12"},
      {value:"U-13", display: "U-13"},
      {value:"U-14", display: "U-14"},
      {value:"U-15", display: "U-15"},
      {value:"U-16", display: "U-16"},
      {value:"U-17", display: "U-17"},
      {value:"U-18", display: "U-18"},
      {value:"U-19", display: "U-19"}
    ]
  genderValues = [{value:"M", display: "Boys"}, {value:"F", display:"Girls"}]
  displayedColumns = ['name','level','age', 'gender']

  constructor(private appService: AppService, private fb: FormBuilder){}


  ngAfterViewInit(): void {
    this.leagues.sort = this.divisionSort;
  }
    
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      level: [''],
      age: [''],
      gender:['']
      
    });
  
    this.appService.getDivisionsForLeague().subscribe(divisions => {
      this.leagues.data = divisions
    })

    this.leagues.filterPredicate = function (data: Division, filter: string): boolean {
      let filterMap = Object.entries(JSON.parse(filter));
      let isMatch = false;
      
      for(let [key, value] of filterMap){
          if (value == null || value == '')continue; // Just a hack to be able to take the raw form. If they didn't fill out the field, don't eval it
          isMatch = data[key as keyof Division] == value
          if (!isMatch) break; // If the first matched failed, break the loop and exit
      }
      return isMatch;

    }
    

  }
  
  filterDivisions(){
    this.leagues.filter = JSON.stringify(this.filterForm.value)
  }

  resetForm(){
    this.filterForm.reset();
  }


}

