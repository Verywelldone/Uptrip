import {Component, Input, OnInit} from '@angular/core';
import {ProductItem, UserControllerService} from "../../../api";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;

  constructor(private userService: UserControllerService) {

  }

  ngOnInit(): void {
  }

  addProductToUserCart() {
    this.userService.addProductToUserCartUsingPOST(this.productItem).subscribe(res => {
      console.log(res);
    });
  }

  addProductToUserFavorite() {
    this.userService.addUserFavoriteProductUsingPOST(this.productItem).subscribe(res => {
      console.log(res);
    });
  }

}
