import {Component, OnInit} from '@angular/core';
import {ProductControllerService, ProductItem} from "../../api";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  productItems: ProductItem[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 1;

  sortField: string = '';
  sortCategoryOptions: SelectItem[]=[];

  constructor(private productService: ProductControllerService) {
  }

  ngOnInit(): void {
    this.productService.getAllProductsUsingGET().subscribe(res => {
      this.productItems = res;
    });


    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.sortCategoryOptions=[
      {label: 'Jackets', value: 'JACKETS'},
      {label: 'Pants', value: 'PANTS'},
      {label: 'Shirts', value: 'SHIRTS'},


    ]

  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
