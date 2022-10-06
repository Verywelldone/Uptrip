import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  items: MenuItem[] = [];
  status: string = 'Personal Information';

  ngOnInit() {
    this.items = [
      {label: 'Personal Information', icon: 'pi pi-fw pi-user', command: () => this.status = 'Personal Information',routerLinkActiveOptions: {exact: true}},
      {label: 'My Orders', icon: 'pi pi-fw pi-shopping-cart', command: () => this.status = 'My Orders'},
      {label: 'Wishlist', icon: 'pi pi-fw pi-heart', command: () => this.status = 'Wishlist'},
      {label: 'My Addresses', icon: 'pi pi-fw pi-map-marker', command: () => this.status = 'My Addresses'},
      {label: 'My Reviews', icon: 'pi pi-fw pi-star', command: () => this.status = 'My Reviews'},

    ]
  }

  constructor() {
  }

}
