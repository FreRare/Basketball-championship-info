import { UserLoadService } from './../../common/services/user-load.service';
import { User } from '../../common/models/User';
import { Subscription } from 'rxjs';
import { UserAuthService } from './../../common/services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { connectStorageEmulator } from '@firebase/storage';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrls: ['./champs.component.scss'],
})
export class ChampsComponent implements OnInit {
  private static LOG_TAG: string = 'CHAMPS => ';

  loggedInUser?: firebase.default.User | null;
  activeUser?: User;
  isAnyoneLoggedIn: boolean = false;
  private userSub?: Subscription;
  private userLoadSub?: Subscription;

  constructor(
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService
  ) {}

  ngOnInit(): void {
    //Getting the logged in user from the database
    this.userSub = this.userAuthService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user) {
          console.log(ChampsComponent.LOG_TAG, "FirebaseUser got!");
          this.userLoadSub = this.userLoadService.findUserById(user?.uid as string)?.subscribe({
            next: (user: User | undefined) => {
              if (user) {
                this.activeUser = new User(
                  user._id,
                  user._name._firstName,
                  user._name._lastName,
                  user._username,
                  user._email,
                  user._likedTeams,
                  user._admin
                );
              } else {
                this.activeUser = undefined;
              }
            },
            error: (error) => {
              console.error(error);
            },
          });
        }else{
          console.log("No user found!");
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userLoadSub?.unsubscribe();
  }
}
