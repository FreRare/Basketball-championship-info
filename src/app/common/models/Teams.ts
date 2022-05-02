export const Positions = [
  'PG (Point guard)',
  'SG (Shooting guard)',
  'SF (Small forward)',
  'PF (Power forward)',
  'C (Center)',
];

//Player class
/*Basketball players has:
  Name
  Age
  Position
  Picture
 */

  export interface Player{
    _id:string;
    _name:{
      _firstName:string;
      _lastName:string;
    }
    _age:number;
    _post:string;
    _nationality:string;
    _height: number;
  }

export class Player implements Player{
  static LOG_TAG = 'PLAYER => ';
   _id: string = "";
   _name = {
    _firstName: "",
    _lastName: ""
  }
   _age: number = 0;
   _post: string = Positions[0];
   _nationality: string = '';
   _height: number = 0;

  constructor(
    id: string = "",
    firstName: string = 'John',
    lastName: string = 'Wick',
    post: string = Positions[0],
    nationality: string = 'USA',
    age: number = 0,
    height: number = 30
  ) {
    this._name = {
      _firstName: firstName,
      _lastName: lastName,
    }
    if (age > 0 && age < 120) {
      this.age = age;
    }
    if (Positions.find((x) => x === post)) {
      this.post = post;
    } else {
      console.log('Invalid post given in constructor! => ' + post);
    }
    this.nation = nationality;
    this.height = height;
  }

  public get name(){
    return this._name;
  }

  public get firstName(): string {
    return this._name._firstName;
  }

  public get lastName():string{
    return this._name._lastName;
  }

  public get fullName(): string {
    return this._name._firstName + " " + this._name._lastName;
  }

  public get id():string{
    return this._id;
  }

  public set id(id: string){
    this._id = id;
  }

  public get post(): string {
    return this._post;
  }

  public get age(): number {
    return this._age;
  }

  public get nation(): string {
    return this._nationality;
  }

  public get height(): number {
    return this._height;
  }

  public set height(h: number) {
    this._height = h;
  }

  public set nation(nation: string) {
    this._nationality = nation;
  }

  public set age(age: number) {
    if (age > 0 && age < 120) {
      this._age = age;
    } else {
      console.log(Player.LOG_TAG + 'invalid age in age setter!');
      this._age = 0;
    }
  }

  public set post(post: string) {
    if (Positions.find((x) => x === post)) {
      this._post = post;
    } else {
      console.log(Player.LOG_TAG, 'invalid post in post setter!');
      this._post = Positions[0];
    }
  }

  areEquals(player: Player){
    return this.fullName === player.fullName && this.age === player.age && this.height === player.height && this.nation === player.nation;
  }

  public toString(){
    return this.fullName + "::" + this.nation + "::" + this.post + "::" + this.age + "::"+this.height;
  }

}

export class Team {
  static LOG_TAG = 'TEAM => ';
  _id: string = "";
   _name: string = '';
   _nation: string = '';
   _players: Array<Player> = [];
   _placement: number = 0;
   _score: number = 0;

  constructor(id:string="",name: string = 'Unknown', nation: string = 'Unknown', players: Player[] = [], place:number=1, score:number=1) {
    this.id = id;
    this.name = name;
    this.nationality = nation;
      this.players = players;
      this.place = place;
      this.score = score;
  }

  public get id():string{
    return this._id;
  }

  public set id(id:string){
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public get nationality(): string {
    return this._nation;
  }

  public get players(): Array<Player> {
    return this._players;
  }

  public get place(): number {
    return this._placement;
  }

  public get score(): number {
    return this._score;
  }

  public set name(name: string) {
    this._name = name;
  }

  /*
  public set teamLogoUrl(url: string) {
    this._teamLogo.src = url;
  }
  */

  public set nationality(nat: string) {
    this._nation = nat;
  }

  public set players(players: Array<Player>) {
    this._players = players;
  }

  public set place(place: number) {
    this._placement = place;
  }

  public set score(s: number) {
    this._score = s;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(player: Player){
    let ogLen = this.players.length;
    this.players = this.players.filter(x => !x.areEquals(player));
    if(this.players.length >= ogLen){
      return false;
    }else{
      return true;
    }
  }

  //Two teams are equal if the name and nation is the same
  public areEquals(t:Team){
    return this.name === t.name && this.nationality === t.nationality;
  }

  public contains(player: Player): boolean{
    for(let p of this.players){
      if(p.areEquals(player)){
        return true;
      }
    }
    return false;
  }

  toString():string{
    return this.name + ":\n" + this.nationality + "\n" + this.players.length + " players.";
  }
}
