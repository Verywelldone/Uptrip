import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../services/auth/token-storage.service";
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  userIsLoggedIn: any = false;
  user: any;
  items: MenuItem[] = [];
  number: any = 2;


  constructor(private tokenStorageService: TokenStorageService, private messageService: MessageService) {
  }


  private update() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
  }

  private delete() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.userIsLoggedIn = true;
      this.user = this.tokenStorageService.getUser();
    }

    this.items = [
      {
        label: 'My Account', icon: 'pi pi-fw pi-user', items: [{
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: ['/user/profile']
        },
          {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['/user/orders']
          },
          {
            label: 'Favorites',
            icon: 'pi pi-fw pi-heart',
          },
          {
            label: 'Reviews',
            icon: 'pi pi-fw pi-star',
          },
          {
            label: 'Addresses',
            icon: 'pi pi-fw pi-map-marker',
          }, {
            label: ' Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ]
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.href = "/";
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
