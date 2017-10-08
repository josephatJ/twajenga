import { Component, OnInit } from '@angular/core';
import {FaqsService} from '../providers/faqs.service';
import {Faqs} from '../models/faqs';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  public faqs: Faqs[];
  public loading: boolean;
  public hasError: boolean;
  constructor(private faqService: FaqsService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.faqService.loadAll().subscribe(faqs => {
      this.faqs = faqs;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    })
  }

}
