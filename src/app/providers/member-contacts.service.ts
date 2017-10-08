import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MemberContacts} from '../models/member-contacts';
import {Http} from '@angular/http';

@Injectable()
export class MemberContactsService {

  public teamContacts: Observable<MemberContacts[]>;
  private _teamContactsPool: BehaviorSubject<MemberContacts[]>;
  private baseUrl: string;
  private dataStore: {
    teamContacts: MemberContacts[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/team.json';
    this.dataStore = {teamContacts: []};
    this._teamContactsPool = <BehaviorSubject<MemberContacts[]>> new BehaviorSubject([]);
    this.teamContacts = this._teamContactsPool;
  }

  //Methods
  loadAll(): Observable<any> {

    return Observable.create(observer => {
      //load data from the pool first
      this.all().subscribe(pool => {
        if (Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(pool);
          observer.complete();
        } else {
          //load data from the source if pool is empty
          this.http.get(this.baseUrl).map(res => res.json()).subscribe(data => {
            //persist data to metadataPool
            this.saveToDetailsPool(data);
            //load data from the pool
            this.all().subscribe(pool => {
              observer.next(pool);
              observer.complete();
            });
          })
        }
      });
    });
  }

  saveToDetailsPool(data: any): void {
    //Replace dataIndex with teamEducation id
    let contactsData = [];
    data.forEach((dataItem, dataIndex) => {
      contactsData[dataItem.id] = dataItem.details;
    });
    this.dataStore.teamContacts = contactsData;
    //persist apps into the pool
    this._teamContactsPool.next(Object.assign({}, this.dataStore).teamContacts);
  }

  all(): Observable<MemberContacts[]> {
    return this.teamContacts;
  }

  find(member_id: string): Observable<MemberContacts> {
    return Observable.create(observer => {
      this.teamContacts.subscribe(contactsData => {
        if (contactsData[member_id]) {
          observer.next(contactsData[member_id]);
          observer.complete();
          console.log(contactsData[member_id]);
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(contactsData => {
            if (contactsData[member_id]) {
              observer.next(contactsData[member_id]);
              observer.complete();
            } else {
              observer.next('Details for member with member_id "'+ member_id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
