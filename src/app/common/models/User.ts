export interface User {
  _id: string;
  _name: {
    _firstName: string;
    _lastName: string;
  };
  _username: string;
  _email: string;
  _admin: boolean;
  _likedTeams: Array<string>;
}
//Class to represent a user
//Users can log in and add comments
//If user is admin then he can add new teams to the championship
export class User implements User {
  public static LOG_TAG: string = 'USER => ';
  private static ADMIN_PASS: string = 'admin123';

  _id: string = '';
  _name = {
    _firstName: '',
    _lastName: '',
  };
  _username: string = '';
  _email: string = '';
  _admin: boolean = false;
  _likedTeams: Array<string> = [];

  constructor(
    id: string = '',
    firstName: string = 'Unknown',
    lastName: string = 'User',
    username: string = 'guest',
    email: string = 'unknown',
    likedTeams: Array<string> = [],
    admin: boolean = false
  ) {
    this.id = id;
    (this.firstName = firstName), (this.lastName = lastName);
    this.username = username;
    this.email = email;
    this._likedTeams = likedTeams;
    this._admin = admin;
  }

  public get name(): {} {
    return this._name;
  }

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public get likes(): string[] {
    return this._likedTeams;
  }

  public set likes(teams: string[]) {
    this._likedTeams = teams;
  }

  //Name setter gets fullname for parameter
  public set firstName(n: string) {
    this._name._firstName = n;
  }

  public get firstName(): string {
    return this._name._firstName;
  }

  public set lastName(n: string) {
    this._name._lastName = n;
  }

  public get lastName(): string {
    return this._name._lastName;
  }

  public get username(): string {
    return this._username;
  }

  public set username(uname: string) {
    this._username = uname;
  }

  public get email(): string {
    return this._email;
  }

  public set email(e: string) {
    this._email = e;
  }
  /*
  public get password():string{
    return this._password;
  }

  public set password(p: string){
    this._password = p;
  }
*/
  public get admin(): boolean {
    return this._admin;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  areEquals(user: User): boolean {
    return (
      this.firstName === user.firstName &&
      this.lastName === user.lastName &&
      this.email === user.email &&
      this.username === user.username &&
      this.admin === user.admin
    );
  }

  public giveAdminAccess(pass: string, admin: boolean = true) {
    if (pass === User.ADMIN_PASS) {
      this._admin = admin;
    } else {
      console.log(User.LOG_TAG, 'Invalid admin password!');
    }
  }

  toString(): string {
    return (
      User.LOG_TAG +
      this.firstName + " " + this.lastName +
      '::' +
      this.email +
      '::' +
      this.username
    );
  }

  isKnown() {
    return !(this.firstName === 'Unknown');
  }
}
