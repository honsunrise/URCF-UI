import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AccountService} from '../../../service/account/account.service';
import {AuthGuard} from '../../../service/auth/auth.guard.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-register-error',
  template: '<h1 mat-dialog-title>Register error</h1>' +
  '<div mat-dialog-content>Happen some error, please try again later.</div>' +
  '<div mat-dialog-actions>' +
  '  <button mat-button mat-dialog-close="true">OK</button>' +
  '</div>'
})
export class DialogSignupErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogSignupErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialog: MatDialog,
              private accountService: AccountService, private authGuard: AuthGuard, private fb: FormBuilder) {
  }

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.form = this.fb.group({
      agree: [false, Validators.compose([CustomValidators.equal(true)])],
      email: ['', Validators.compose([Validators.required, CustomValidators.email])],
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  onSubmit() {
    this.accountService.register(this.form.value['email'], this.form.value['password']).subscribe(() => {
      this.authGuard.redirect();
    }, error => {
      this.dialog.open(DialogSignupErrorComponent, {
        disableClose: true,
        width: '350px',
      });
    });
  }
}
