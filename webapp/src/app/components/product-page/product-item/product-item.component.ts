import {Component, Input, OnInit} from '@angular/core';
import {UserControllerService} from "../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;

  constructor(private userService: UserControllerService, private messageService: MessageService) {


  }

  ngOnInit(): void {
  }

  addProductToUserCart() {
    this.userService.addProductToUserCartUsingPOST(this.productItem).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product added to cart'});
    });
  }

  addProductToUserFavorite() {
    console.log(this.productItem);
    this.userService.addUserFavoriteProductUsingPOST(this.productItem).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product added to favorites'});
    });
  }

}
