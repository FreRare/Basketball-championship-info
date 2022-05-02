import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {Positions, Team, Player} from "../../../common/models/Teams";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  private static LOG_TAG = "ADD_TEAM => ";

  teamAdded: Team = new Team();
  @Output() teamAddedEmitter: EventEmitter<Team> = new EventEmitter

  constructor(){

  }

  ngOnInit(): void {

  }

  addTeam(ev: Team){
    this.teamAdded = ev;
    //console.log(AddTeamComponent.LOG_TAG, this.teamAdded.toString());
    this.teamAddedEmitter.emit(this.teamAdded);
  }

  addPlayers(ev: Array<Player>){
    this.teamAdded.players = ev;
    //console.log(AddTeamComponent.LOG_TAG, "Players added: ", ev);
  }

  removePlayer(ev: Player){
    if(this.teamAdded.removePlayer(ev)){
      console.log(ev.fullName + " removed!");
    }else{
      console.log(ev.fullName + " was not removed!");
    }
  }
}
