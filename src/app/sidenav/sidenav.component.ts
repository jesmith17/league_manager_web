import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

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
  
  
  constructor(private router: Router){}
  hasChild = (_: number, node: MenuLink) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
    
    this.links = [
      {path: 'home', title: "Home", icon: 'fa-house'},
      {path: 'league', title: "Divisions"},
      {path: 'team', title: "Team Search"},
      {path: 'tournaments', title: "Tournaments"}, 
      {path: 'coaches', title: "Coaches"}, 
      {path: 'referees', title: "Referees"}, 
      {path: 'sponsors', title: "Sponsors"}, 
      {path: 'login', title: "Login"},
      {path: 'admin/profile', title: "Profile"}

    ]
  }


}
