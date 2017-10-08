import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Project} from '../models/project';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectsService {

  public projects: Observable<Project[]>;
  private _projectsPool: BehaviorSubject<Project[]>;
  private baseUrl: string;
  private dataStore: {
    projects: Project[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/projects.json';
    this.dataStore = {projects: []};
    this._projectsPool = <BehaviorSubject<Project[]>> new BehaviorSubject([]);
    this.projects = this._projectsPool;
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
            this.saveToProjectPool(data);
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

  saveToProjectPool(data: any): void {
    //Replace dataIndex with project id
    let projectData = [];
    data.forEach((dataItem, dataIndex) => {
      projectData[dataItem.id] = dataItem;
    });
    this.dataStore.projects = projectData;
    //persist apps into the pool
    this._projectsPool.next(Object.assign({}, this.dataStore).projects);
  }

  all(): Observable<Project[]> {
    return this.projects;
  }

  find(id: number): Observable<Project> {
    return Observable.create(observer => {
      this.projects.subscribe(projectData => {
        if(projectData[id]) {
          observer.next(projectData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(projectData => {
            if(projectData[id]) {
              observer.next(projectData[id]);
              observer.complete();
            } else {
              observer.next('Project with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
