import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
