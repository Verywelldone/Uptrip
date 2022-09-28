import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/auth/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(response => this.message = response, error => this.message = JSON.parse(error.error).message);
  }

}
