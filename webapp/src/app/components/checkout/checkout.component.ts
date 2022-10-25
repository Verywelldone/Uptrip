import {Component} from '@angular/core';
import {OrderControllerService, OrderProductDto, ProductItemRes, UserControllerService} from "../../api";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {shareReplay, take} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  orderFormGroup = this.fb.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required]),
    address: new FormControl('TestAddress1', [Validators.required]),
    address2: new FormControl('TestAddress2'),
    city: new FormControl('Brasov', [Validators.required]),
    postalCode: new FormControl('810076', [Validators.required]),
    saveAddress: new FormControl(true),
  });

  orderForm: any = {};
  cartItems: Array<ProductItemRes> = new Array<ProductItemRes>();

  constructor(private userService: UserControllerService,
              private fb: FormBuilder,
              private orderService: OrderControllerService,
              private messageService: MessageService) {

    this.userService.getAllUserProductItemsFromCartUsingGET().pipe(
      shareReplay(),
      take(1))
      .subscribe(res => {
        this.cartItems = res;
        this.orderForm.orderProducts = res;

        this.userService.getUserProfileInfoUsingGET().subscribe(res => {
          this.orderFormGroup.patchValue({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNo: res.phoneNumber,
          });
        });
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

  checkOut() {
    let orderProductItems: Array<OrderProductDto> = new Array<OrderProductDto>();
    this.cartItems.forEach(item => {
      orderProductItems.push({productItem: item, quantity: 1});
    });

    this.orderForm = {
      firstName: this.orderFormGroup.get('firstName')?.value!,
      lastName: this.orderFormGroup.get('lastName')?.value!,
      email: this.orderFormGroup.get('email')?.value!,
      phoneNo: this.orderFormGroup.get('phoneNo')?.value!,
      address: this.orderFormGroup.get('address')?.value!,
      address2: this.orderFormGroup.get('address2')?.value!,
      city: this.orderFormGroup.get('city')?.value!,
      postalCode: this.orderFormGroup.get('postalCode')?.value!,
      saveAddress: Boolean(this.orderFormGroup.get('saveAddress')?.value!),
      totalPrice: this.getTotalPrice(),
      orderProducts: orderProductItems
    };
    console.log(this.orderForm)

    this.orderService.createUsingPOST(this.orderForm).subscribe(res => {
      this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: res.message});
    });

    // window.location.reload();
  }
}

/**
 *   address?: string;
 *     address2?: string;
 *     city?: string;
 *     email?: string;
 *     firstName?: string;
 *     lastName?: string;
 *     orderProducts?: Array<OrderProductDto>;
 *     phoneNo?: string;
 *     postalCode?: string;
 *     saveAddress?: boolean;
 *     totalPrice?: string;
 */



