import {Component, Input, OnInit} from '@angular/core';
import {ProductItem} from "../../../api";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: ProductItem | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
