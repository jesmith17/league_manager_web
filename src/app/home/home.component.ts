import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  customer: Customer;

  constructor(service: AppService){
    this.customer = service.customer;
  }

}
