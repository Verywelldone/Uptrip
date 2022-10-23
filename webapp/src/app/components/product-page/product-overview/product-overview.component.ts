import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  ProductControllerService,
  ProductItem,
  ProductRatingDto,
  RatingSystemControllerService,
  UserControllerService
} from "../../../api";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {


  productItem!: ProductItem;
  productRatingsDto: ProductRatingDto[] = [];
  private sub: any;
  private productId: number = -1;
  ratingAverage: any = 0;

  constructor(private route: ActivatedRoute,
              private productService: ProductControllerService,
              private ratingService: RatingSystemControllerService,
              private userService: UserControllerService) {
    this.sub = this.route.paramMap.subscribe((params: any) => {
      this.productId = params.get('productId');
      this.productService.getOneUsingGET1(this.productId).subscribe(res => {
        console.log(res);
        this.productItem = res;
      });
    });
  }

  ngOnInit(): void {
    this.getProductRating()
  }

  addProductToUserCart(productItem: ProductItem) {
    console.log(productItem);
    this.userService.addProductToUserCartUsingPOST(productItem).subscribe(res => {
      console.log(res);
    });
  }

  getProductRating() {
    this.ratingService.getAllServiceRatingsUsingGET(this.productId).subscribe(res => {
      console.log(res);
      this.productRatingsDto = res;

      let sum = 0;
      res.forEach(rating => {
        sum += rating.stars;
      });

      this.ratingAverage = Math.ceil(sum / res.length);
    });
  }

}
