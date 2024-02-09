import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router, Route } from '@angular/router';

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
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuLink>();
  
  
  constructor(private router: Router){}
  hasChild = (_: number, node: MenuLink) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
    
    this.dataSource.data = [
      {path: 'home', title: "Home"},
      {path: 'league', title: "Divisions", 
        children: [
          {path: 'league/schedules', title: "Schedule"},
          {path: 'league/results', title: "Results/Standings"},
        ]
      },
      {path: 'team', title: "Team Search"},
      {path: 'tournaments', title: "Tournaments"}, 
      {path: 'coaches', title: "Coaches"}, 
      {path: 'referees', title: "Referees"}, 
      {path: 'sponsors', title: "Sponsors"}, 
      {path: 'admin/login', title: "Login"}

    ]
  }


}
