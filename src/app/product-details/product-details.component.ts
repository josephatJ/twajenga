import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../models/product';
import {ProductService} from '../providers/product.service';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  loading: boolean;
  hasError: boolean;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.loading = true;
    this.hasError = false;

    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        video: true,
        dots: true,
        dotsContainer: '#carousel-custom-dots',
        responsive: {
          0: {
            items: 1,
            loop: true,
            autoplaySpeed: 2000
          },
          600: {
            items: 1,
            loop: true,
            autoplaySpeed: 2000
          },
          1000: {
            items: 1,
            loop: true,
            autoplaySpeed: 2000
          }
        }
      });
      $('.owl-dot').click(function () {
        $('.owl-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
      });
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const productID: string = params['id'];
      this.productService.find(productID).subscribe(product => {
        this.product = product;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.hasError = true;
      });
    });
  }

}
