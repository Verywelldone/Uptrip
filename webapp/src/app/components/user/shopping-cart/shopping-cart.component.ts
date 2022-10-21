import {Component, OnInit} from '@angular/core';
import {ProductItem, UserControllerService} from "../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Array<ProductItem> = [];

  constructor(private userService: UserControllerService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.userService.getAllUserProductItemsFromCartUsingGET().subscribe(res => {
      console.log(res);
      this.cartItems = res;
    });
  }

  removeItemFromCart(productItem: ProductItem) {
    this.userService.removeUserProductFromCartUsingPOST(productItem).subscribe(res => {
      this.cartItems = this.cartItems.filter(item => item.id !== productItem.id);

      this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: 'Item removed from cart'});
    });
  }
}
