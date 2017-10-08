import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../providers/product.service';
declare var $:any;

@Component({
  selector: 'app-sliding-products',
  templateUrl: './sliding-products.component.html',
  styleUrls: ['./sliding-products.component.css']
})
export class SlidingProductsComponent implements OnInit {

  products: Product[];
  loading: boolean;
  hasError: boolean;
  displayStatus: string;
  backgroundcolor: string;
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
    $('.landing-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav: false,
      dots: true,
      dotsContainer: '#carousel-custom-dots',
      responsiveClass:true,
      responsive:{
        0:{
          items:1,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        600:{
          items:1,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        },
        1000:{
          items:1,
          loop:true,
          autoplay:true,
          autoplaySpeed: 2000
        }
      }
    });
    $('.owl-dot').click(function () {
      $('.landing-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
    });
  }

  showThisDiv() {
    this.displayStatus = 'block';
    // this.backgroundcolor = 'yellow';
  }

  hideThisDiv() {
    this.displayStatus = 'none';
    this.backgroundcolor = 'transparent';
  }
}
