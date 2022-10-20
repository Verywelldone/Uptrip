import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductControllerService, ProductItem} from "../../../api";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent {


  productItem!: ProductItem;
  private sub: any;
  private productId: number = -1;

  constructor(private route: ActivatedRoute, private productService: ProductControllerService) {
    this.sub = this.route.paramMap.subscribe((params: any) => {
      this.productId = params.get('productId');
      this.productService.getOneUsingGET1(this.productId).subscribe(res => {
        console.log(res);
        this.productItem = res;
      });
    });
  }

}
