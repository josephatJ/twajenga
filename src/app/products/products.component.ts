import { Component, OnInit } from '@angular/core';
import {ProductService} from '../providers/product.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  loading: boolean;
  hasError: boolean;
  constructor(private productService: ProductService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    this.productService.loadAll().subscribe(products => {
      this.products = Object.keys(products).map(key => products[key]);
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.hasError = true;
      this.loading = false;
    });
  }

}
