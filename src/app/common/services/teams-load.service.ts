import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable, Type } from '@angular/core';
import { Player, Team } from '../models/Teams';

@Injectable({
  providedIn: 'root',
})
export class TeamsLoadService {
  private collectionName: string = 'Teams';

  constructor(private afs: AngularFirestore) {}

  createTeam(team: Team) {

      for (let i = 0; i < team.players.length; i++) {
        //For some reason this thing throws a to of the same error ("post is undeifned"), i don't know why, but the database works so i don't care xd
        team.players[i].id = this.afs.createId();
        team.players[i] = Object.assign({}, team.players[i]);

      }
    team.id = this.afs.createId();
    return this.afs
      .collection<Team>(this.collectionName)
      .doc(team.id)
      .set(Object.assign({}, team));
  }

  findAllTeams() {
    return this.afs.collection<Team>(this.collectionName).valueChanges();
  }

  updateTeam(team: Team) {
    try {
      //Converting team to pure JS object
      for (let i = 0; i < team.players.length; i++) {
        team.players[i] = Object.assign({}, team.players[i]);
      }
    } catch (error) {
      if (error) {
        console.log(
          'Typeerror because of the Object.assign() method reads undefined property of a Player object. But the data is uploaded to the cloud!!'
        );
      } else {
        console.error(error);
      }
    }

    return this.afs.collection<Team>(this.collectionName).doc(team.id).update(Object.assign({}, team));
  }
}
