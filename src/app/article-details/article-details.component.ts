import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../providers/article.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Article} from '../models/article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  public loading: boolean;
  public hasError: boolean;
  public article: Article;
  public moreArticles: Article[];
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      const moreArticles = [];
      this.articleService.loadAll().subscribe(articles => {
        articles.forEach(article => {
          if (article.id == articleId) {
            this.article = article;
            console.log(article);
          } else {
            moreArticles.push(article);
          }
        });
        this.moreArticles =  moreArticles;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.hasError =  true;
      });
    });
  }

}
