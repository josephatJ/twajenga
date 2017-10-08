import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Article} from '../models/article';

@Injectable()
export class ArticleService {

  public articles: Observable<Article[]>;
  private _articlesPool: BehaviorSubject<Article[]>;
  private baseUrl: string;
  private dataStore: {
    articles: Article[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/articles.json';
    this.dataStore = {articles: []};
    this._articlesPool = <BehaviorSubject<Article[]>> new BehaviorSubject([]);
    this.articles = this._articlesPool;
  }

  //Methods
  loadAll(): Observable<any> {

    return Observable.create(observer => {
      //load data from the pool first
      this.all().subscribe(pool => {
        if (Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(Object.keys(pool).map(key => pool[key]));
          observer.complete();
        } else {
          //load data from the source if pool is empty
          this.http.get(this.baseUrl).map(res => res.json()).subscribe(data => {
            //persist data to metadataPool
            this.saveToArticlePool(data);
            //load data from the pool
            this.all().subscribe (pool => {
              observer.next(Object.keys(pool).map(key => pool[key]));
              observer.complete();
            });
          })
        }
      });
    });
  }

  saveToArticlePool(data: any): void {
    //Replace dataIndex with article id
    const articleData = [];
    data.forEach((dataItem, dataIndex) => {
      articleData[dataItem.id] = dataItem;
    });
    this.dataStore.articles = articleData;
    //persist apps into the pool
    this._articlesPool.next(Object.assign({}, this.dataStore).articles);
  }

  all(): Observable<Article[]> {
    return this.articles;
  }

  find(id: number): Observable<Article> {
    return Observable.create(observer => {
      this.articles.subscribe(articleData => {
        if(articleData[id]) {
          observer.next(articleData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(articleData => {
            if (articleData[id]) {
              observer.next(articleData[id]);
              observer.complete();
            } else {
              observer.next('Article with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
