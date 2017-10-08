import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Team} from '../models/team';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TeamService {

  public teams: Observable<Team[]>;
  private _teamsPool: BehaviorSubject<Team[]>;
  private baseUrl: string;
  private dataStore: {
    teams: Team[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/team.json';
    this.dataStore = {teams: []};
    this._teamsPool = <BehaviorSubject<Team[]>> new BehaviorSubject([]);
    this.teams = this._teamsPool;
  }

  // Methods
  loadAll(): Observable<any> {
    return Observable.create(observer => {
      // load data from the pool first
      this.all().subscribe(pool => {
        if(Object.keys(pool).map(key => pool[key]).length > 0) {
          observer.next(Object.keys(pool).map(key => pool[key]));
          observer.complete();
        } else {
          // load data from the source if pool is empty
          this.http.get(this.baseUrl).map(res => res.json()).subscribe(data => {
            // persist data to metadataPool
            this.saveToTeamPool(data);
            // load data from the pool
            this.all().subscribe( pool => {
              observer.next(Object.keys(pool).map(key => pool[key]));
              observer.complete();
            });
          });
        }
      });
    });
  }

  saveToTeamPool(data: any): void {
    // Replace dataIndex with team id
    let teamData = [];
    data.forEach((dataItem, dataIndex) => {
      teamData[dataItem.id] = dataItem;
    });
    this.dataStore.teams = teamData;
    // persist apps into the pool
    this._teamsPool.next(Object.assign({}, this.dataStore).teams);
  }

  all(): Observable<Team[]> {
    return this.teams;
  }

  find(id: string): Observable<Team> {
    return Observable.create(observer => {
      this.teams.subscribe(teamData => {
        if (teamData[id]) {
          observer.next(teamData[id]);
          observer.complete();
        } else {
          // load from source if pool has no data
          this.loadAll().subscribe( teamData => {
            if (teamData[id]) {
              observer.next(teamData[id]);
              observer.complete();
            } else {
              observer.next('Team member with id "' + id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
