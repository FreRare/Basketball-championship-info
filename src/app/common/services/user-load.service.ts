import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserLoadService {
  private static LOG_TAG: string = 'USER_LOAD_SERVICE => ';

  private collectionName = 'Users';

  constructor(private afs: AngularFirestore) {}

  createUser(user: User) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(user.id)
      .set(Object.assign({}, user)); //converting user to an object
  }

  findUserById(id: string) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  findAllUsers() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  updateUser(user: User) {
      if (user) {
        return this.afs
          .collection<User>(this.collectionName)
          .doc(user.id)
          .update(Object.assign({}, user));
      } else {
        return undefined;
      }
  }

  deleteUser(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).delete();
  }
}
