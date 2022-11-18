import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {UserControllerService} from "../../../../api";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {catchError, map, throwError} from "rxjs";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInformationComponent {

  userPasswordForm = this.fb.group({
    oldPassword: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    newPassword: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    confirmPassword: new FormControl('', {validators: [Validators.required], nonNullable: true})
  });

  userInfoForm = this.fb.group({
    username: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
    email: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
    firstName: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
    lastName: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
    phoneNumber: new FormControl<string>('', {validators: [Validators.required], nonNullable: true})
  });

  constructor(private userService: UserControllerService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.userService.getUserProfileInfoUsingGET().subscribe(response => {
      this.userInfoForm.setValue(response);
      this.cdr.detectChanges()
    });
  }


  updateUserInfo() {

    this.userService.updateUserProfileInfoUsingPUT(this.userInfoForm.getRawValue()).subscribe(() => {
      console.log("User info updated successfully");
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User info updated successfully'
      });
    });
  }

  updatePassword() {
    const {oldPassword, newPassword, confirmPassword} = this.userPasswordForm.getRawValue();

    this.userService.updateUserPasswordUsingPOST({oldPassword, newPassword, confirmPassword})
      .pipe(map(data => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password updated successfully'
          });
          return data;
        }),
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password update failed'
          });
          return throwError(err);
        }))
      .subscribe();
  }

  formHasChanges() {
    return this.userInfoForm.pristine;
  }
}
