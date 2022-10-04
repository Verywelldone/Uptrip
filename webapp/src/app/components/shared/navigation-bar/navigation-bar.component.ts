import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/auth/token-storage.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  userIsLoggedIn: any = false;
  user: any;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.userIsLoggedIn = true;
      this.user = this.tokenStorageService.getUser();
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
