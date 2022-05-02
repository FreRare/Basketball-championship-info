import { UserLoadService } from './../../common/services/user-load.service';
import { UserAuthService } from './../../common/services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../common/models/User';
//import { Image } from '../../common/models/Image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private static LOG_TAG: string = 'HOME => ';

  profileImageSub?: Subscription;

  private userSubscription?: Subscription;
  activeUser?: User;
  loading: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService
  ) {}

ngOnInit() {
    this.userSubscription = this.userAuthService.getLoggedInUser().subscribe({
      next: (user) => {
          this.userLoadService.findUserById(user?.uid as string)?.subscribe({
            next: (user) => {
              if (user) {
                this.activeUser = new User(user._id, user._name._firstName, user._name._lastName, user._username, user._email, user._likedTeams, user._admin);
              } else {
                this.activeUser = undefined;
              }
            },
            error:(error=>{
              console.error(HomeComponent.LOG_TAG, error);
            })
          });
      },
      error: (error) => {
        console.error(HomeComponent.LOG_TAG, error);
      }
    });
  }

  ngOnDestroy(): void {
    this.userLoadService.updateUser(this.activeUser as User);
    this.userSubscription?.unsubscribe();
    this.profileImageSub?.unsubscribe();
  }

  dislike(team:string){
    if(this.activeUser){
    this.activeUser.likes = this.activeUser?.likes.filter(t=>!(t === team));
    //this.userLoadService.updateUser(this.activeUser as User);
    }
  }
}
