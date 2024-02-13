import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { faHouse, faLayerGroup, faPeopleGroup, faSearch } from '@fortawesome/free-solid-svg-icons';

interface MenuLink {
  path: string,
  title: string,
  children?: MenuLink[]
}



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit{
  
  links: any;
  @Input() customer: Customer;

  faHouse = faHouse
  faPeopleGroup = faPeopleGroup
  faLayerGroup = faLayerGroup
  faSearch = faSearch

  
  
  constructor(private router: Router){}
  hasChild = (_: number, node: MenuLink) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
    
    this.links = [
      {path: 'home', title: "Home", icon: this.faHouse},
      {path: 'league', title: "Divisions", icon: this.faLayerGroup},
      {path: 'team', title: "Team Search", icon: this.faSearch},
      {path: 'tournaments', title: "Tournaments"}, 
      {path: 'coaches', title: "Coaches"}, 
      {path: 'referees', title: "Referees"}, 
      {path: 'sponsors', title: "Sponsors"}, 
      {path: 'login', title: "Login"},
      {path: 'admin/profile', title: "Profile"}

    ]
  }


}
