import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

  public products: Observable<Product[]>;
  private _productsPool: BehaviorSubject<Product[]>;
  private baseUrl: string;
  private dataStore: {
    products: Product[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/products.json';
    this.dataStore = {products: []};
    this._productsPool = <BehaviorSubject<Product[]>> new BehaviorSubject([]);
    this.products = this._productsPool;
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
            this.saveToProductPool(data);
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

  saveToProductPool(data: any): void {
    //Replace dataIndex with product id
    let productData = [];
    data.forEach((dataItem, dataIndex) => {
      productData[dataItem.id] = dataItem;
    });
    this.dataStore.products = productData;
    //persist apps into the pool
    this._productsPool.next(Object.assign({}, this.dataStore).products);
  }

  all(): Observable<Product[]> {
    return this.products;
  }

  find(id: string): Observable<Product> {
    return Observable.create(observer => {
      this.products.subscribe(productData => {
        if(productData[id]) {
          observer.next(productData[id]);
          observer.complete();
        } else {
          //load from source if pool has no data
          this.loadAll().subscribe(productData => {
            if(productData[id]) {
              observer.next(productData[id]);
              observer.complete();
            } else {
              observer.next('Product with id "'+ id + '" could not be found or may have been deleted');
              observer.complete();
            }
          });
        }
      });
    });
  }
}
