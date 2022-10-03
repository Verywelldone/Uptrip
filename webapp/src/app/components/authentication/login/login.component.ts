import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {TokenStorageService} from "../../../services/auth/token-storage.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage: any;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getUser().roles;
      this.reloadPage();
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error!',
          detail: error.error.message
        });
      }
    );
  }

  reloadPage() {
    window.location.href = 'home';
  }

}
