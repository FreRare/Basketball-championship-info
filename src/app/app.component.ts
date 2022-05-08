import { UserLoadService } from './common/services/user-load.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from './common/models/User';
import { UserAuthService } from './common/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private static LOG_TAG = 'ROOT';
  //Service to keep active user status refreshed everywhere where needed
  title = 'Basketball championship manager'; // The title of the page
  activePage: string = ''; //The page that is actually active
  routes: string[] = []; //All routes provided by the router
  loggedInUser?: User;
  isAnyoneLoggedIn: boolean = false;
  private routerSubscription?: Subscription;
  private routerTriggerSubscription?: Subscription;
  private authSub?: Subscription;
  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //Getting the routes of the router module to set the activePage to the value provided by the route
    //In short setting the active page by the actual route
    this.routes = this.router.config.map((x) => x.path) as string[];
    //Filtering router events to get the path of the route
    //Then setting the activePage to the string after the first slash

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((events: any) => {
        const active = (events.urlAfterRedirects as string).split(
          '/'
        )[1] as string;
        if (this.routes.includes(active)) {
          this.activePage = active;
        } else {
          this.activePage = '/home';
        }
      });

    //Subscription for route changes to trigger user observable
    this.routerTriggerSubscription = this.router.events
      .pipe()
      .subscribe(() => {
        //Subscription for firebase user service
        this.authSub = this.userAuthService.getLoggedInUser().subscribe({
          next: (user) => {
            this.userSubscription = this.userLoadService
              .findUserById(user?.uid as string)
              .subscribe({
                next: (user) => {
                  if (
                    localStorage.getItem('firesbaseUser') ||
                    localStorage.getItem('activeUser')
                  ) {
                    if (user) {
                      this.loggedInUser = new User(
                        user?._id,
                        user?._name._firstName,
                        user?._name._lastName,
                        user?._username,
                        user?._email,
                        user?._likedTeams,
                        user?._admin
                      );
                    } else {
                      this.loggedInUser = undefined;
                      //this.loggedInUser = JSON.parse(localStorage.getItem("activeUser") as string) as User;
                    }
                  } else {
                    this.loggedInUser = undefined;
                  }
                },
                error: (err) => {
                  console.error(err);
                },
              });
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
  }

  ngOnDestroy(): void {
    //Kell vajon ez a kód, vagy ha megszűnik az osztály akkor automatikusan leiratkozik, mivel a router is megszűnik?!
    this.routerSubscription?.unsubscribe();
    this.routerTriggerSubscription?.unsubscribe();
    this.authSub?.unsubscribe();
    localStorage.clear();
  }

  openSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  closeSidenav(event: any, sideNav: MatSidenav) {
    if (event) {
      sideNav.close();
    }
  }

  logOut() {
    //Log out the user
    this.userSubscription?.unsubscribe();
    this.authSub?.unsubscribe();
    this.routerTriggerSubscription?.unsubscribe();


    localStorage.removeItem('firebaseUser');
    localStorage.removeItem('activeUser');

    this.userLoadService.updateUser(this.loggedInUser as User);
    this.userAuthService.logout();
    this.loggedInUser = undefined;
    console.log('Logout');
    this.router.navigateByUrl('/login');
  }
}
