import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../services/auth/token-storage.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidebar-scss.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  userIsLoggedIn: boolean = false;
  user: any;

  constructor(private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.userIsLoggedIn = true;
      this.user = this.tokenStorageService.getUser();
    }

  }
  onSidenavClose() {
    this.sidenavClose.emit()
  }


  logout() {
    this.tokenStorageService.signOut();
    window.location.href = "/";
  }

}
