import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

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

  userAccountFormGroup: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    password: new FormControl("", Validators.required)
  });

  userDetailsFormGroup: FormGroup = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required)
  });


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {

    this.form = {
      username: this.userAccountFormGroup.controls['username'].value,
      email: this.userAccountFormGroup.controls['email'].value,
      password: this.userAccountFormGroup.controls['password'].value,
      userInfo: {
        address: this.userDetailsFormGroup.controls['address'].value,
        city: this.userDetailsFormGroup.controls['city'].value,
        firstName: this.userDetailsFormGroup.controls['fname'].value,
        email: this.userAccountFormGroup.controls['email'].value,
        lastName: this.userDetailsFormGroup.controls['lname'].value,
        phoneNumber: this.userDetailsFormGroup.controls['phone'].value,
      },
    }
    console.log(this.form)
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // this.router.navigate(['login']).then(r => this.router.navigate(['login']));
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
