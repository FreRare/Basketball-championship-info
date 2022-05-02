import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../../../common/models/Teams';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.scss']
})
export class ListPlayersComponent implements OnInit {

  private static LOG_TAG = "LIST_PLAYERS => ";

  //The input from the parent which contains the players added
  //the team builded by this form is stored and loaded from AddTeamComponent
  //this just lists the content
  // it is why there is need to input this data
  @Input() addedPlayers: Array<Player> = [];
  //Remove is controlled from this site
  //This emits the player that should be removed
  //So the AddTeamComponent data can be updated
  @Output() removedPlayerEmitter: EventEmitter<Player> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  //Removes the player from the list and emits it also
  removePlayer(player: Player){
    this.addedPlayers = this.addedPlayers.filter(x => !x.areEquals(player));
    console.log(ListPlayersComponent.LOG_TAG, " players after remove: ", this.addedPlayers);
    this.removedPlayerEmitter.emit(player);
  }

}
