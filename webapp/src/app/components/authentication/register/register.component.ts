import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  createSignupForm(): FormGroup {
    return this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
  }

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.form = this.createSignupForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(res => {
        console.log(res);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      }, err => {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error!',
          detail: err.error.message
        });
        this.isSignUpFailed = true;
      }
    );
  }
}
