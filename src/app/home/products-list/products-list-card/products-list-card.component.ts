import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-products-list-card',
  templateUrl: './products-list-card.component.html',
  styleUrls: ['./products-list-card.component.css']
})
export class ProductsListCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {
  }

}
