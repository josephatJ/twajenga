import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from "rxjs"
import {TeamExperience} from "../models/team-experience";

@Injectable()
export class TeamExperienceService {

  public teamExperiences: Observable<TeamExperience[]>;
  private _teamExperiencesPool: BehaviorSubject<TeamExperience[]>;
  private baseUrl: string;
  private dataStore: {
    teamExperiences: TeamExperience[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/team.json';
    this.dataStore = {teamExperiences: []};
    this._teamExperiencesPool = <BehaviorSubject<TeamExperience[]>> new BehaviorSubject([]);
    this.teamExperiences = this._teamExperiencesPool;
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
            this.saveToTeamExperiencePool(data);
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

  saveToTeamExperiencePool(data: any): void {
    //Replace dataIndex with teamExperience id
    let teamExperienceData = [];
    data.forEach((dataItem, dataIndex) => {
      teamExperienceData[dataItem.id] = dataItem.experience;
    });
    this.dataStore.teamExperiences = teamExperienceData;
    //persist apps into the pool
    this._teamExperiencesPool.next(Object.assign({}, this.dataStore).teamExperiences);
  }

  all(): Observable<TeamExperience[]> {
    return this.teamExperiences;
  }

  find(member_id: string): Observable<TeamExperience> {
    return Observable.create(observer => {
      this.teamExperiences.subscribe(teamExperienceData => {
        if(teamExperienceData[member_id]) {
          observer.next(teamExperienceData[member_id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(teamExperienceData => {
            if(teamExperienceData[member_id]) {
              observer.next(teamExperienceData[member_id]);
              observer.complete();
            } else {
              observer.next('TeamExperience member with member_id "'+ member_id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}

