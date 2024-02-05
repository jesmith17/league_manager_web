import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { League } from './models/league';
import { AppService } from './app.service';
import { DOCUMENT } from '@angular/common';
import { Customer } from './models/customer';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{
  mobileQuery: MediaQueryList;
  title = 'league-manager-web';
  showSideNav = false;
  activeLeague?: League;
  customer: Customer;
  sidenavMode: 'side';
  

  domain: string;

  options = this.fb.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  constructor(private fb: FormBuilder, private service: AppService, @Inject(DOCUMENT) private document: any, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    
    this.domain = this.document.location.hostname;
    this.service.getCustomerByURL(this.domain).subscribe(customer => {
      this.customer = customer[0];
      this.service.customer = this.customer;
      this.activeLeague = this.customer.active_league
      this.service.activeLeague = this.activeLeague
    })

    
    
  }

}
