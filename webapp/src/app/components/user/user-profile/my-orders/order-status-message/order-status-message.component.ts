import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-status-message',
  templateUrl: './order-status-message.component.html',
  styleUrls: ['./order-status-message.component.css']
})
export class OrderStatusMessageComponent implements OnInit {

  @Input() orderStatus:  any;
  @Input() lastStatusUpdate: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
