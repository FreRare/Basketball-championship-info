import { MatchesService } from './../../common/services/matches.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLoadService } from './../../common/services/user-load.service';
import { User } from '../../common/models/User';
import { Subscription } from 'rxjs';
import { UserAuthService } from './../../common/services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Match } from '../../common/models/Match';

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
  private matchesSub?: Subscription;

  matches: Match[] = [];


  //Match input form
  matchForm: FormGroup = new FormGroup({
    team1: new FormControl(),
    team2: new FormControl(),
    time: new FormControl(),
    place: new FormControl()
  });

  constructor(
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {

    this.matchForm.get("team1")?.addValidators([Validators.required]);
    this.matchForm.get("team2")?.addValidators([Validators.required]);
    //Getting the logged in user from the database
/*
    this.loggedInUser = JSON.parse(localStorage.getItem("firebaseUser")as string);
    this.activeUser = JSON.parse(localStorage.getItem("activeUser") as string) as User | undefined;
    console.log(ChampsComponent.LOG_TAG, this.activeUser?.firstName);
*/

    this.userSub = this.userAuthService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user) {
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

    this.matchesSub = this.matchesService.findAll().subscribe({
      next: matches=>{
        this.matches = matches;
      },
      error:er=>{
        console.error(ChampsComponent.LOG_TAG, er);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userLoadSub?.unsubscribe();
    this.matchesSub?.unsubscribe();
  }

  onSubmit(){
    if(this.matchForm.valid){
      const newMatch = {
        id:"",
        team1: this.matchForm.get("team1")?.value,
        team2: this.matchForm.get("team2")?.value,
        time: new Date(this.matchForm.get("time")?.value).getTime(),
        place: this.matchForm.get("place")?.value
      };
      this.matchesService.create(newMatch).then(()=>{
        console.log(ChampsComponent.LOG_TAG, "Match up to cloud!");
      });
    }else{
      console.log(ChampsComponent.LOG_TAG, "Invalid fields!");
    }
  }

  delete(m:Match){
    this.matchesService.delete(m);
  }
}
