import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from '../models/User';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public static LOG_TAG = "MENU => ";

  //Emits the selected page when the selection changes
  @Output() selectedPage:EventEmitter<string> = new EventEmitter();
  //Emits a flag to close the side nav when clicked anywhere
  @Output() closeSideNavEmitter: EventEmitter<any> = new EventEmitter();
  //Emits a flag to log out the User being logged in from AppComponent
  @Output() logoutEmitter: EventEmitter<boolean> = new EventEmitter();
  //Active page from app
  @Input() activePage: string = "";
  //Flag for logged in user from app
  @Input() loggedInUser?: User;

  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  menuSwitch(){
    this.selectedPage.emit(this.activePage);
  }

  closeSidenav(){
    this.closeSideNavEmitter.emit(true);
  }

  logOutActiveUser(){
    this.loggedInUser = undefined;
    this.logoutEmitter.emit(true);
  }
}
