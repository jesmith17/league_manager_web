import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: UserProfileComponent},
  /*{path: 'league', component: LeagueHomeComponent, title: "League Home", data: {linkText: "Leagues"}, 
    children: [
      {path: 'schedules', component: LeagueScheduleComponent, title: "League Schedule", data: {linkText: "League Detail"}},
      {path: 'results', component: LeagueResultsComponent, title: "League Results", data: {linkText: "List"}},
      {path: ':id', component: LeagueDetailComponent, title: "Division Detail"},
      {path: '', component: LeagueListComponent, title: "Division List"},
    ]
  },
  {path: 'team', component: TeamHomeComponent, title: "Team Home", children: [
    {path: ':id', component: TeamDetailComponent, title: "Team Detail"},
  ]},*/
  {path: '**', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
