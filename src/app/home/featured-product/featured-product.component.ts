import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../providers/product.service';

export const PRODUCTS = [
  'Solidarity-Group-Lending','Equipment-Finance','Boda-boda-Loans','Microleasing-Loan','Business-Loan','Micro-housing-Loan'
]
@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent implements OnInit {

  featuredProduct: Product;
  loading: boolean;
  hasError: boolean;
  constructor(private productService: ProductService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    const featuredProductID = PRODUCTS[Math.floor((Math.random() * PRODUCTS.length) + 0)];
    this.productService.find(featuredProductID).subscribe((product) => {
      this.featuredProduct = product;
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    })
  }

}
