import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TeamConsultancy} from '../models/team-consultancy';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TeamConsultancyService {

  public teamConsultancies: Observable<TeamConsultancy[]>;
  private _teamConsultanciesPool: BehaviorSubject<TeamConsultancy[]>;
  private baseUrl: string;
  private dataStore: {
    teamConsultancies: TeamConsultancy[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/team.json';
    this.dataStore = {teamConsultancies: []};
    this._teamConsultanciesPool = <BehaviorSubject<TeamConsultancy[]>> new BehaviorSubject([]);
    this.teamConsultancies = this._teamConsultanciesPool;
  }

  //Methods
  loadAll(): Observable<any> {

    return Observable.create(observer => {
      //load data from the pool first
      this.all().subscribe(pool => {
        if(Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(pool);
          observer.complete();
        } else {
          //load data from the source if pool is empty
          this.http.get(this.baseUrl).map(res => res.json()).subscribe(data => {
            //persist data to metadataPool
            this.saveToTeamConsultancyPool(data);
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

  saveToTeamConsultancyPool(data: any): void {
    //Replace dataIndex with teamConsultancy id
    let teamConsultancyData = [];
    data.forEach((dataItem, dataIndex) => {
      teamConsultancyData[dataItem.id] = dataItem.consultancy;
    });
    this.dataStore.teamConsultancies = teamConsultancyData;
    //persist apps into the pool
    this._teamConsultanciesPool.next(Object.assign({}, this.dataStore).teamConsultancies);
  }

  all(): Observable<TeamConsultancy[]> {
    return this.teamConsultancies;
  }

  find(member_id: string): Observable<TeamConsultancy> {
    return Observable.create(observer => {
      this.teamConsultancies.subscribe(teamConsultancyData => {
        if(teamConsultancyData[member_id]) {
          observer.next(teamConsultancyData[member_id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(teamConsultancyData => {
            if(teamConsultancyData[member_id]) {
              observer.next(teamConsultancyData[member_id]);
              observer.complete();
            } else {
              observer.next('TeamConsultancy member with member_id "' + member_id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}

