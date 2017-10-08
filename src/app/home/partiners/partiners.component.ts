import { Component, OnInit } from '@angular/core';
import {PartnersService} from '../../providers/partners.service';

@Component({
  selector: 'app-partiners',
  templateUrl: './partiners.component.html',
  styleUrls: ['./partiners.component.css']
})
export class PartnersComponent implements OnInit {

  public partners: any;
  public loading: boolean;
  public hasError: boolean;
  constructor(
    private partnerService: PartnersService
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {}

}

