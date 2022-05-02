import { Match } from './../models/Match';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private collectionName = "Matches";

  constructor( private afs: AngularFirestore) {}

  create(match: Match){
    match.id = this.afs.createId();
    return this.afs.collection<Match>(this.collectionName).doc(match.id).set(match);
  }

  findAll(){
    return this.afs.collection<Match>(this.collectionName).valueChanges();
  }

  delete(match:Match){
    return this.afs.collection<Match>(this.collectionName).doc(match.id).delete();
  }
}
