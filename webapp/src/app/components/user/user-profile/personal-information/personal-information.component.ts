import {Component, OnInit} from '@angular/core';
import {UpdatePasswordDto, UserControllerService, UserProfileInfoDto} from "../../../../api";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  userProfileInfo: UserProfileInfoDto = {};

  userPasswordForm = this.fb.group({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  userInfoForm = this.fb.group({
    username: new FormControl(this.userProfileInfo.username, Validators.required),
    email: new FormControl(this.userProfileInfo.email, Validators.compose([Validators.required, Validators.email])),
    firstname: new FormControl(this.userProfileInfo.firstName, Validators.required),
    lastname: new FormControl(this.userProfileInfo.lastName, Validators.required),
    phonenumber: new FormControl(this.userProfileInfo.phoneNumber, Validators.required)
  });

  constructor(private userService: UserControllerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private router: Router) {

  }


  ngOnInit(): void {
    this.userService.getUserProfileInfoUsingGET().subscribe(response => {
      this.userProfileInfo = response
      // @ts-ignore
      this.userInfoForm.get('username').setValue(this.userProfileInfo.username);
      // @ts-ignore
      this.userInfoForm.get('email').setValue(this.userProfileInfo.email);
      // @ts-ignore
      this.userInfoForm.get('firstname').setValue(this.userProfileInfo.firstName);
      // @ts-ignore
      this.userInfoForm.get('lastname').setValue(this.userProfileInfo.lastName);
      // @ts-ignore
      this.userInfoForm.get('phonenumber').setValue(this.userProfileInfo.phoneNumber);
    });

  }


  updateUserInfo() {
    // @ts-ignore
    this.userProfileInfo.username = this.userInfoForm.value.username;
    // @ts-ignore
    this.userProfileInfo.email = this.userInfoForm.value.email;
    // @ts-ignore
    this.userProfileInfo.firstName = this.userInfoForm.value.firstname;
    // @ts-ignore
    this.userProfileInfo.lastName = this.userInfoForm.value.lastname;
    // @ts-ignore
    this.userProfileInfo.phoneNumber = this.userInfoForm.value.phonenumber;

    this.userService.updateUserProfileInfoUsingPUT(this.userProfileInfo).subscribe(response => {
      console.log(response);
      this.reloadPage();
    });
  }

  updatePassword() {
    // @ts-ignore
    let updatePasswordDto: UpdatePasswordDto = {
      oldPassword: this.userPasswordForm.value.oldPassword!,
      newPassword: this.userPasswordForm.value.newPassword!,
      confirmPassword: this.userPasswordForm.value.confirmPassword!
    }

    this.userService.updateUserPasswordUsingPOST(updatePasswordDto).subscribe(
      data => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success!',
          detail: data
        });

        setTimeout(() => {
          this.reloadPage();
        }, 2000);
      },
      error => {
        console.log(error);
        this.messageService.add({
          key: 'tc',
          severity: 'warn',
          summary: 'Something went wrong!',
          detail: error.error
        });
      }
    );
  }


  reloadPage() {
    window.location.href = '/user/profile';
  }

  formHasChanges() {
    return this.userInfoForm.pristine;
  }
}
