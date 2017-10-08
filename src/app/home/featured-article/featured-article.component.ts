import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/article';
import {ArticleService} from '../../providers/article.service';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {

  public article: Article;
  public loading: boolean;
  public hasError: boolean;
  constructor(
    private articleService: ArticleService
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.articleService.find(1).subscribe(article => {
      this.article = article;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    });
  }

}
