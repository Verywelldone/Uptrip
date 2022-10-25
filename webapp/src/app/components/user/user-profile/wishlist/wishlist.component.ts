import {Component, OnInit} from '@angular/core';
import {UserControllerService} from "../../../../api";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products: any;

  constructor(private userService: UserControllerService) {
  }

  ngOnInit(): void {
    this.userService.getAllUserFavoriteProductsUsingGET().subscribe(response => {
      this.products = response;
    });
  }

}
