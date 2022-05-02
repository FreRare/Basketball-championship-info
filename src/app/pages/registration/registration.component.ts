import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoadService } from '../../common/services/user-load.service';
import { User } from '../../common/models/User';
import { UserAuthService } from '../../common/services/user-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public static LOG_TAG: string= "REGISTRATION => "

  errors: Array<string> = [];

  registrationFrom = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordAgain: new FormControl(''),
  });

  constructor(
    private router: Router,
    private location: Location,
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService
  ) {}

  ngOnInit(): void {
    this.registrationFrom
      .get('firstName')
      ?.addValidators([Validators.required]);
    this.registrationFrom.get('lastName')?.addValidators([Validators.required]);
    this.registrationFrom.get('username')?.addValidators([Validators.required]);
    this.registrationFrom.get('email')?.addValidators([Validators.required]);
    this.registrationFrom
      .get('password')
      ?.addValidators([Validators.required, Validators.minLength(8)]);
    this.registrationFrom
      .get('passwordAgain')
      ?.addValidators([Validators.required, Validators.minLength(8)]);
  }

  onSubmit() {
    //If the form is invalid get the errors and return
    if (this.registrationFrom.invalid) {
      //Passwords are valid from 8 char length so if those are valid the problem ca only be that there are mossing fields
      if (
        this.registrationFrom.get('password')?.valid &&
        this.registrationFrom.get('passwordAgain')?.valid
      ) {
        this.errors.push('All fields are required!');
      } else if (
        this.registrationFrom.get('password')?.value !==
        this.registrationFrom.get('passwordAgain')?.value
      ) {
        //If the two passwords are not  equal
        this.errors.push('Two passwords are not matching!');
      } else {
        //Otherwise the problem only can be that the password is less than 8 chars
        this.errors.push('Password minimum length is 8 chacarters!');
      }
      this.errors.push("Invalid form!");
      return;
    }

    //If the form is valid start the authentication method
    try{
    this.userAuthService
      .registrate(
        this.registrationFrom.get('email')?.value,
        this.registrationFrom.get('password')?.value,
      )
      .then((cred) => {
        //creating user from input data
        const userSigned = new User(
        cred.user?.uid as string,
        this.registrationFrom.get('firstName')?.value,
        this.registrationFrom.get('lastName')?.value,
        this.registrationFrom.get('username')?.value,
        this.registrationFrom.get('email')?.value
        );
        //inserting user to database
        this.userLoadService.createUser(userSigned).then(_=>{
          console.log('User registrated successfully!');
          this.router.navigateByUrl('/login');
        }).catch(err => {
          console.log(RegistrationComponent.LOG_TAG, "userLoad", err);
          this.errors.push(err.toString());
        });
      })
      .catch((error) => {
        console.log(RegistrationComponent.LOG_TAG, error);

      });
    }catch(error){
      console.error(RegistrationComponent.LOG_TAG, error);
      this.errors.push("Email is already in use!");
    }
  }

  back() {
    this.location.back();
  }
}
