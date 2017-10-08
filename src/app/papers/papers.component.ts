import { Component, OnInit } from '@angular/core';
import {PaperService} from '../providers/paper.service';
import {Paper} from '../models/paper';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit {

  public papers: Paper[];
  public loading: boolean;
  public hasError: boolean;
  constructor(private paperService: PaperService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.paperService.loadAll().subscribe((papers) => {
        this.papers = papers;
        this.loading = false;
        this.hasError = false;
      },
      error => {
        this.loading = false;
        this.hasError = true;
      })
  }

}
