import { UserLoadService } from './../../common/services/user-load.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../common/models/User';
import { UserAuthService } from 'src/app/common/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private static LOG_TAG = 'LOGIN => ';

  //Login form data
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  //Flag for login in progress
  loggingIn: boolean = false;
  //errors of the login
  loginError: string = '';
  loggedInUser?: User = new User();

  userSub?: Subscription;

  //Defining router and loginService
  constructor(
    private router: Router,
    private location: Location,
    private userAuthService: UserAuthService,
    private userService: UserLoadService
  ) {}

  ngOnInit(): void {
    this.loginForm.get('email')?.addValidators([Validators.required]);
    this.loginForm.get('password')?.addValidators([Validators.required]);
  }

  back() {
    this.location.back();
  }

  login() {
    //Logging in user
    //Setting flag to true
    this.loggingIn = true;
    //Checking if ther form is valid
    if (
      !this.loginForm.get('email')?.valid ||
      !this.loginForm.get('password')?.valid
    ) {
      this.loginError = 'All fields are required!';
      this.loggingIn = false;
      return;
    }
    try {
      this.userAuthService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .then((user) => {
          this.loggedInUser = user as User;
          localStorage.setItem('activeUser', JSON.stringify(this.loggedInUser));
          console.log('Ha ezt olvasod nagy király vagy! <3');
          this.loggingIn = false;
          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          this.loggedInUser = undefined;
          console.error(LoginComponent.LOG_TAG, error);
          this.loginError = error;
        })
        .finally(() => {
          this.loggingIn = false;
        });
    } catch (error) {
      console.error(LoginComponent.LOG_TAG, 'Invalid username-password combo!');
      this.loggingIn = false;
      localStorage.removeItem('firebaseUser');
      localStorage.removeItem('activeUser');
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.loggingIn = false;
  }
}
