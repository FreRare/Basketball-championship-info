import { Subscription } from 'rxjs';
import { UserLoadService } from './../../common/services/user-load.service';
import { UserAuthService } from './../../common/services/user-auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsLoadService } from '../../common/services/teams-load.service';
import { Player, Team } from '../../common/models/Teams';
import { User } from '../../common/models/User';
import { TmplAstBoundAttribute } from '@angular/compiler';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
//Includes a team describing team and player classes
export class TeamsComponent implements OnInit {
  private static LOG_TAG: string = 'TEAMS => ';
  teamsOfTheChampionship: Array<Team> = [];
  teamsOfTheChampionshipToDisplay: Array<Team> = [];
  isThereAnyTeams: boolean = true;
  activeUser?: User;
  teamSub?: Subscription;
  userSub?: Subscription;

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private teamService: TeamsLoadService,
    private userAuthService: UserAuthService,
    private userLoadService: UserLoadService
  ) {}

  ngOnInit(): void {
    //Getting the logged in user from the database

    //this.activeUser = JSON.parse(localStorage.getItem("activeUser")as string) as User | undefined;

    this.userSub = this.userAuthService.getLoggedInUser().subscribe({
      next: (user) => {
        this.userLoadService.findUserById(user?.uid as string)?.subscribe({
          next: (user) => {
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
        });
      },
    });

    //Getting teams from the database
    this.teamSub = this.teamService.findAllTeams().subscribe({
      next: (teams) => {
        //this.teamsOfTheChampionship = teams;
        this.teamsOfTheChampionship = [];
        for (let t of teams) {
          //Because firestore cannot store custom objects when getting tha data i make a custom object from it
          //in order to use the properties of the class
          let newTeam = new Team(
            t._id,
            t._name,
            t._nation,
            t._players,
            t._placement,
            t._score
          );
          for (let p of newTeam.players) {
            p = new Player(
              p._id,
              p._name._firstName,
              p._name._lastName,
              p._post,
              p._nationality,
              p._age,
              p._height
            );
          }
          this.teamsOfTheChampionship.push(newTeam);
        }
        this.sortTeams(this.teamsOfTheChampionship);
        this.teamsOfTheChampionshipToDisplay = this.teamsOfTheChampionship;
      },
    });
  }

  ngOnDestroy(): void {
    this.userLoadService.updateUser(this.activeUser as User);
    for (let t of this.teamsOfTheChampionship) {
      this.teamService.updateTeam(t);
    }
    this.userSub?.unsubscribe();
    this.teamSub?.unsubscribe();
  }

  //Add a team to the championship
  addTeam(ev: Team) {
    //Checking if there is any team with the same name and nation on the list
    for (let t of this.teamsOfTheChampionship) {
      if (t.areEquals(ev)) {
        console.log(TeamsComponent.LOG_TAG + 'team is already on the list!');
        return;
      }
    }
    this.teamsOfTheChampionship.push(ev);
    //Adding team to datbase
    this.teamService.createTeam(ev).then(() => {
      //Sorting teams again, there might were changes
      this.sortTeams(this.teamsOfTheChampionship);
      this.teamsOfTheChampionshipToDisplay = this.teamsOfTheChampionship;
    });
  }

  //To search for teams
  searchTeam() {
    //Getting serach input
    let searchInput = this.searchForm.get('search')?.value as string;
    //Checking if it is really an input
    if (searchInput.length <= 0) {
      this.teamsOfTheChampionshipToDisplay = this.teamsOfTheChampionship;
      return;
    }

    //searching for the teams with the given name
    /*
    this.teamsOfTheChampionshipToDisplay = this.teamsOfTheChampionship.filter(t=>{
      t.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    */
    console.log('Why is there pain?', '... this is why!');
    //For some reason Array.filter() won't work so i just made a qiuck filter method XD
    this.teamsOfTheChampionshipToDisplay = [];
    for (let t of this.teamsOfTheChampionship) {
      if (t.name.toLowerCase().includes(searchInput.toLowerCase())) {
        this.teamsOfTheChampionshipToDisplay.push(t);
      }
    }
    this.sortTeams(this.teamsOfTheChampionshipToDisplay);

    //Checking if there is any teams to display when searching
    if (this.teamsOfTheChampionshipToDisplay.length <= 0) {
      this.isThereAnyTeams = false;
    } else {
      this.isThereAnyTeams = true;
    }
  }

  //Save teams to cloud
  //Refresh database
  //Called when save button is clicked
  save() {
    this.sortTeams(this.teamsOfTheChampionship);
    for (let t of this.teamsOfTheChampionship) {
      this.teamService.updateTeam(t);
    }
  }

  //Sorting teams by score as first suspect and name as second
  sortTeams(teams: Array<Team>) {
    teams.sort((a, b) => {
      return a.score === b.score
        ? a.name < b.name
          ? -1
          : 1
        : a.score > b.score
        ? -1
        : 1;
    });
    let i = 0;
    for (let t of teams) {
      i++;
      t.place = i;
    }
    //return teams;
  }

  //Incrementing the score of a team
  //Button provided for it next to the team
  incrScoreOfTeam(team: Team) {
    team.score++;
  }

  //Also for decrementation
  decrScoreOfTeam(team: Team) {
    if (team.score <= 1) {
      team.score = 0;
    } else {
      team.score--;
    }
  }

  isLiked(team: Team): boolean {
    if (this.activeUser?.likes.includes(team.name)) {
      return true;
    } else {
      return false;
    }
  }

  likeTeam(team: Team) {
    if (this.activeUser?.likes.includes(team.name)) {
      this.activeUser.likes = this.activeUser.likes.filter(
        (t) => t != team.name
      );
    } else {
      if (this.activeUser) {
        this.activeUser.likes[this.activeUser.likes.length] = team.name;
        console.log(TeamsComponent.LOG_TAG, team.name, ' Team liked!');
      }
      //this.userLoadService.updateUser(this.activeUser as User);
    }
  }
}
