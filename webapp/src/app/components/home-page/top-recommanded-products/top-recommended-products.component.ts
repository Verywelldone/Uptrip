import {Component, OnInit} from '@angular/core';
import {ProductControllerService, ProductItem, UserControllerService} from "../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-top-recommanded-products',
  templateUrl: './top-recommended-products.component.html',
  styleUrls: ['./top-recommended-products.component.css']
})
export class TopRecommendedProducts implements OnInit {
  // responsiveOptions = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 3,
  //     numScroll: 3
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 2,
  //     numScroll: 2
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1,
  //     numScroll: 1
  //   }
  // ];

  products: Array<ProductItem> = [];

  constructor(private productService: ProductControllerService,
              private messageService: MessageService,
              private userService: UserControllerService) {

  }

  ngOnInit(): void {
    this.productService.getTopProductsUsingGET().subscribe(res => this.products = res);
  }


  addProductToCart(product: any) {
    this.userService.addProductToUserCartUsingPOST(product).subscribe(() => {
      this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: "Product added to cart!"});
    });
  }
}
