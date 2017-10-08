import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from "rxjs"
import {Partner} from "../models/partner";

@Injectable()
export class PartnersService {

  public partners: Observable<Partner[]>;
  private _partnersPool: BehaviorSubject<Partner[]>;
  private baseUrl: string;
  private dataStore: {
    partners: Partner[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/partner.json';
    this.dataStore = {partners: []};
    this._partnersPool = <BehaviorSubject<Partner[]>> new BehaviorSubject([]);
    this.partners = this._partnersPool;
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
            this.saveToPartnerPool(data);
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

  saveToPartnerPool(data: any): void {
    //Replace dataIndex with partner id
    let partnerData = [];
    data.forEach((dataItem, dataIndex) => {
      partnerData[dataItem.id] = dataItem;
    });
    this.dataStore.partners = partnerData;
    //persist apps into the pool
    this._partnersPool.next(Object.assign({}, this.dataStore).partners);
  }

  all(): Observable<Partner[]> {
    return this.partners;
  }

  find(id: number): Observable<Partner> {
    return Observable.create(observer => {
      this.partners.subscribe(partnerData => {
        if(partnerData[id]) {
          observer.next(partnerData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(partnerData => {
            if(partnerData[id]) {
              observer.next(partnerData[id]);
              observer.complete();
            } else {
              observer.next('Partner with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
