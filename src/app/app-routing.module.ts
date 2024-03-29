import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { LeagueHomeComponent } from './league-home/league-home.component';
import { TeamHomeComponent } from './team-home/team-home.component';
import { LeagueResultsComponent } from './league-results/league-results.component';
import { LeagueScheduleComponent } from './league-schedule/league-schedule.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, title: "Heartland Soccer Home", data: {linkText: "Home"}},
  {path: 'league', component: LeagueHomeComponent, title: "League Home", data: {linkText: "Leagues"}, 
    children: [
      {path: 'schedules', component: LeagueScheduleComponent, title: "League Schedule", data: {linkText: "League Detail"}},
      {path: 'results', component: LeagueResultsComponent, title: "League Results", data: {linkText: "List"}},
      {path: ':id', component: LeagueDetailComponent, title: "Division Detail"},
      {path: '', component: LeagueListComponent, title: "Division List"},
    ]
  },
  {path: 'team', component: TeamHomeComponent, title: "Team Home", children: [
    {path: ':id', component: TeamDetailComponent, title: "Team Detail"},
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'admin', loadChildren: () => AdminRoutingModule, canActivateChild: [AuthGuard] },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
