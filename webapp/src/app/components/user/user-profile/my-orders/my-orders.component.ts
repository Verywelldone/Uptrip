import {Component, OnInit} from '@angular/core';
import {OrderControllerService, OrderRes} from "../../../../api";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderResponse: Array<OrderRes> = new Array<OrderRes>();

  constructor(private orderService: OrderControllerService) {
  }

  ngOnInit(): void {
    this.orderService.getAllByCustomerUsingGET(7).subscribe(res => {
      console.log(res);
      this.orderResponse = res

    });
  }

}
