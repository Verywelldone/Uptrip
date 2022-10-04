import {Component, OnInit} from '@angular/core';
import {ProductControllerService, ProductItem} from "../../api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  productItems: Observable<Array<ProductItem>> | undefined;

  constructor(private productService: ProductControllerService) {
  }

  ngOnInit(): void {
    this.productItems = this.productService.getAllProductsUsingGET();
    this.productItems.subscribe();
  }

}
