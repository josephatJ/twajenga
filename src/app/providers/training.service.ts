import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from "rxjs"
import {Training} from "../models/training";

@Injectable()
export class TrainingService {

  public trainings: Observable<Training[]>;
  private _trainingsPool: BehaviorSubject<Training[]>;
  private baseUrl: string;
  private dataStore: {
    trainings: Training[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/trainings.json';
    this.dataStore = {trainings: []};
    this._trainingsPool = <BehaviorSubject<Training[]>> new BehaviorSubject([]);
    this.trainings = this._trainingsPool;
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
            this.saveToTrainingPool(data);
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

  saveToTrainingPool(data: any): void {
    //Replace dataIndex with training id
    let trainingData = [];
    data.forEach((dataItem, dataIndex) => {
      trainingData[dataItem.id] = dataItem;
    });
    this.dataStore.trainings = trainingData;
    //persist apps into the pool
    this._trainingsPool.next(Object.assign({}, this.dataStore).trainings);
  }

  all(): Observable<Training[]> {
    return this.trainings;
  }

  find(id: number): Observable<Training> {
    return Observable.create(observer => {
      this.trainings.subscribe(trainingData => {
        if(trainingData[id]) {
          observer.next(trainingData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(trainingData => {
            if(trainingData[id]) {
              observer.next(trainingData[id]);
              observer.complete();
            } else {
              observer.next('Training with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
