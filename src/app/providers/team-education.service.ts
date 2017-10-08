import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from "rxjs"
import {TeamEducation} from '../models/team-education';

@Injectable()
export class TeamEducationService {

  public teamEducations: Observable<TeamEducation[]>;
  private _teamEducationsPool: BehaviorSubject<TeamEducation[]>;
  private baseUrl: string;
  private dataStore: {
    teamEducations: TeamEducation[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/team.json';
    this.dataStore = {teamEducations: []};
    this._teamEducationsPool = <BehaviorSubject<TeamEducation[]>> new BehaviorSubject([]);
    this.teamEducations = this._teamEducationsPool;
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
            this.saveToTeamEducationPool(data);
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

  saveToTeamEducationPool(data: any): void {
    //Replace dataIndex with teamEducation id
    let teamEducationData = [];
    data.forEach((dataItem, dataIndex) => {
      teamEducationData[dataItem.id] = dataItem.education;
    });
    this.dataStore.teamEducations = teamEducationData;
    //persist apps into the pool
    this._teamEducationsPool.next(Object.assign({}, this.dataStore).teamEducations);
  }

  all(): Observable<TeamEducation[]> {
    return this.teamEducations;
  }

  find(member_id: string): Observable<TeamEducation> {
    return Observable.create(observer => {
      this.teamEducations.subscribe(teamEducationData => {
        if(teamEducationData[member_id]) {
          observer.next(teamEducationData[member_id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(teamEducationData => {
            if(teamEducationData[member_id]) {
              observer.next(teamEducationData[member_id]);
              observer.complete();
            } else {
              observer.next('TeamEducation member with member_id "'+ member_id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}

