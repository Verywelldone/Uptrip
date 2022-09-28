import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/auth/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(response => this.message = response, error => {
      console.log(error)
      this.message = JSON.parse(error.error).message
    });
  }

}
