import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player, Team, Positions } from '../../../../common/models/Teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-team-form',
  templateUrl: './add-team-form.component.html',
  styleUrls: ['./add-team-form.component.scss']
})
export class AddTeamFormComponent implements OnInit {

  private static LOG_TAG = "ADD_TEAM_FORM => ";

  //posts to use in the html form
  //Not accessible if just imported
  posts: Array<string> = Positions;

  /**
   * Input and output data
   * teamAddedEmitter: emits the team when the form is submitted
   * playersAddedEmitter: emits the players to get it listed
   * playersAddedInput: the input of the players
   * last two are needed for communication with the list component
   */
  @Output() teamAddedEmitter: EventEmitter<Team> = new EventEmitter();
  @Output() playersAddedEmitter: EventEmitter<Array<Player>> = new EventEmitter();
  @Input() playersAddedInput: Player[] = [];

  teamBeingBuilt: Team = new Team();
  actualPlayerAdded: Player = new Player();
  errors: Array<string> = [];
  teamErrors: Array<string> =[];

  teamAdder:FormGroup = new FormGroup({
    teamName: new FormControl(""),
    teamNation: new FormControl(""),
    players: new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      age: new FormControl(""),
      post: new FormControl(""),
      nation: new FormControl(""),
      height: new FormControl(""),
      //profilePicture: new FormControl("")
    }),
  });

  constructor(private location:Location, private router: Router) {
  }

  ngOnInit(): void {
    //Setting validators for the form
    //Required all
    this.teamAdder.get("teamName")?.addValidators(Validators.required);
    this.teamAdder.get("teamNation")?.addValidators(Validators.required);
    this.teamAdder.get("players")?.get("firstName")?.addValidators(Validators.required);
    this.teamAdder.get("players")?.get("lastName")?.addValidators(Validators.required);
    //Age must be over 7
    this.teamAdder.get("players")?.get("age")?.addValidators([Validators.required, Validators.min(7)]);
    this.teamAdder.get("players")?.get("post")?.addValidators(Validators.required);
    //nationality max length is 50 chars
    this.teamAdder.get("players")?.get("nation")?.addValidators([Validators.required, Validators.maxLength(50)]);
    this.teamAdder.get("players")?.get("height")?.addValidators(Validators.required);
  }

  submit(){
    this.teamErrors = [];
    this.teamBeingBuilt.players = this.playersAddedInput;
    if(this.teamAdder.valid){
      this.teamBeingBuilt.name = this.teamAdder.get("teamName")?.value;
      this.teamBeingBuilt.nationality = this.teamAdder.get("teamNation")?.value;
      //this.playersAddedEmitter.emit([]);
      this.teamAddedEmitter.emit(this.teamBeingBuilt);
    }else{
      this.teamErrors.push("All fields are reqiured!");
    }
  }

  back(){
    this.location.back();
  }

  addNewPlayer(){
    this.errors = [];
    //If team size is 10 the team is full
    if(this.teamBeingBuilt.players.length >= 10){
      this.errors.push("You have reached the maximum team size!");
      return;
    }
    this.teamBeingBuilt.players = this.playersAddedInput;
    let playerForm = this.teamAdder.get("players");
    if(playerForm?.valid){
      this.actualPlayerAdded = new Player("", playerForm.get("firstName")?.value, playerForm.get("lastName")?.value, playerForm.get("post")?.value, playerForm.get("nation")?.value, playerForm.get("age")?.value, playerForm.get("height")?.value);
      if(this.teamBeingBuilt.contains(this.actualPlayerAdded)){
        return;
      }
      this.teamBeingBuilt.addPlayer(this.actualPlayerAdded);
      this.playersAddedEmitter.emit(this.teamBeingBuilt.players);
    }else{
      if(!playerForm?.get("firstName")?.valid || !playerForm?.get("lastName")?.valid || !playerForm?.get("nation")?.valid || !playerForm?.get("height")?.valid){
        this.errors.push("All field are required!");
      }
      if(!playerForm?.get("age")?.valid){
        this.errors.push("Age must be over 6!");
      }
      console.log("Invalid inputs!");
    }
  }
}
