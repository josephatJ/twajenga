import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import {Faqs} from '../models/faqs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FaqsService {

  public faqss: Observable<Faqs[]>;
  private _faqssPool: BehaviorSubject<Faqs[]>;
  private baseUrl: string;
  private dataStore: {
    faqss: Faqs[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/faqs.json';
    this.dataStore = {faqss: []};
    this._faqssPool = <BehaviorSubject<Faqs[]>> new BehaviorSubject([]);
    this.faqss = this._faqssPool;
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
            this.saveToFaqsPool(data);
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

  saveToFaqsPool(data: any): void {
    //Replace dataIndex with faqs id
    let faqsData = [];
    data.forEach((dataItem, dataIndex) => {
      faqsData[dataItem.id] = dataItem;
    });
    this.dataStore.faqss = faqsData;
    //persist apps into the pool
    this._faqssPool.next(Object.assign({}, this.dataStore).faqss);
  }

  all(): Observable<Faqs[]> {
    return this.faqss;
  }

  find(id: number): Observable<Faqs> {
    return Observable.create(observer => {
      this.faqss.subscribe(faqsData => {
        if(faqsData[id]) {
          observer.next(faqsData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(faqsData => {
            if(faqsData[id]) {
              observer.next(faqsData[id]);
              observer.complete();
            } else {
              observer.next('Faqs with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
