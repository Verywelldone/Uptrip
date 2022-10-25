import {Component, OnInit} from '@angular/core';
import {
  OrderControllerService,
  OrderForm,
  OrderProductDto,
  ProductItem,
  ProductItemRes,
  UserControllerService
} from "../../../api";
import {MessageService} from "primeng/api";
import {TokenStorageService} from "../../../services/auth/token-storage.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Array<ProductItemRes> = new Array<ProductItemRes>();

  constructor(private userService: UserControllerService,
              private orderService: OrderControllerService,
              private tokenService: TokenStorageService,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.userService.getAllUserProductItemsFromCartUsingGET().subscribe(res => {
      console.log(res);
      this.cartItems = res;
    });
  }

  removeItemFromCart(productItem: ProductItemRes) {
    this.userService.removeUserProductFromCartUsingPOST(productItem).subscribe(res => {
      this.cartItems = this.cartItems.filter(item => item.id !== productItem.id);

      this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: 'Item removed from cart'});
    });
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.price!, 0);
  }



}
