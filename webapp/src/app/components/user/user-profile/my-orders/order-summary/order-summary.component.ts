import {Component, OnInit} from '@angular/core';
import {OrderControllerService, OrderProductRes, OrderRes} from "../../../../../api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  private sub: any;
  orderUUID: any
  orderRes: OrderRes | undefined;
  orderProducts: Array<OrderProductRes> = new Array<OrderProductRes>();

  constructor(private orderService: OrderControllerService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params: any) => {
      this.orderUUID = params.get('orderUUID');
      this.orderService.getOrderByUUIDUsingGET(this.orderUUID).subscribe(
        res => {
          this.orderRes = res!;
          this.orderProducts = res!.orderProducts!;
        }
      )
    })
  }

}
