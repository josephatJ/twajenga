import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Paper} from '../models/paper';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PaperService {

  public papers: Observable<Paper[]>;
  private _papersPool: BehaviorSubject<Paper[]>;
  private baseUrl: string;
  private dataStore: {
    papers: Paper[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/papers.json';
    this.dataStore = {papers: []};
    this._papersPool = <BehaviorSubject<Paper[]>> new BehaviorSubject([]);
    this.papers = this._papersPool;
  }

  //Methods
  loadAll(): Observable<any> {

    return Observable.create(observer => {
      //load data from the pool first
      this.all().subscribe(pool => {
        if(Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(Object.keys(pool).map(key => pool[key]));
          observer.complete();
        } else {
          //load data from the source if pool is empty
          this.http.get(this.baseUrl).map(res => res.json()).subscribe(data => {
            //persist data to metadataPool
            this.saveToPaperPool(data);
            //load data from the pool
            this.all().subscribe(pool => {
              observer.next(Object.keys(pool).map(key => pool[key]));
              observer.complete();
            });
          })
        }
      });
    });
  }

  saveToPaperPool(data: any): void {
    //Replace dataIndex with paper id
    let paperData = [];
    data.forEach((dataItem, dataIndex) => {
      paperData[dataItem.id] = dataItem;
    });
    this.dataStore.papers = paperData;
    //persist apps into the pool
    this._papersPool.next(Object.assign({}, this.dataStore).papers);
  }

  all(): Observable<Paper[]> {
    return this.papers;
  }

  find(id: number): Observable<Paper> {
    return Observable.create(observer => {
      this.papers.subscribe(paperData => {
        if(paperData[id]) {
          observer.next(paperData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(paperData => {
            if(paperData[id]) {
              observer.next(paperData[id]);
              observer.complete();
            } else {
              observer.next('Paper with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
