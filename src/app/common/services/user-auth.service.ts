import { UserLoadService } from './user-load.service';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private LOG_TAG: string = 'USER_AUTH => ';

  userSub?: Subscription;

  constructor(
    private authService: AngularFireAuth,
    private userService: UserLoadService
  ) {}

  async login(email: string, password: string): Promise<User | string> {
    return new Promise<User>((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          this.userSub = this.userService
            .findUserById(cred.user?.uid as string)
            .subscribe({
              next: (users) => {
                if (users) {
                  localStorage.setItem(
                    'firebaseUser',
                    JSON.stringify(users) as string
                  );
                  const user = new User(
                    users._id,
                    users._name._firstName,
                    users._name._lastName,
                    users._username,
                    users._email,
                    users._likedTeams,
                    users._admin
                  );
                    resolve(user);
                }
              },
              error: (err) => {
                console.error(this.LOG_TAG, err);

                reject(undefined);
              },
            });
        })
        .catch((error) => {
          console.error(this.LOG_TAG, error);

          reject('Invalid username-password combo!');
        });
    });
  }

  registrate(email: string, password: string) {
    return this.authService.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.authService.signOut();
  }

  getLoggedInUser() {
    return this.authService.user;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
