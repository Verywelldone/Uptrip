import {Component} from '@angular/core';
import {UserService} from "../../services/auth/user.service";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  message$: Observable<string>;

  constructor(private userService: UserService) {
    this.message$ = this.userService.getUserBoard().pipe(catchError(err => {
      console.log(err);
      return throwError(err);
    }));
  }

}
