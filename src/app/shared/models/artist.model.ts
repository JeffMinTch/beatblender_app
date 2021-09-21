import { User } from './user.model';
 export class Artist {

      private _artistID: string;
      private _user: User;
      private _creationDate: Date;

	constructor(artistID: string, user: User, creationDate: Date) {
		this._artistID = artistID;
		this._user = user;
		this._creationDate = creationDate;
	}



    /**
     * Getter artistID
     * @return {string}
     */
	public get artistID(): string {
		return this._artistID;
	}

    /**
     * Getter user
     * @return {User}
     */
	public get user(): User {
		return this._user;
	}

    /**
     * Getter creationDate
     * @return {Date}
     */
	public get creationDate(): Date {
		return this._creationDate;
	}

    /**
     * Setter artistID
     * @param {string} value
     */
	public set artistID(value: string) {
		this._artistID = value;
	}

    /**
     * Setter user
     * @param {User} value
     */
	public set user(value: User) {
		this._user = value;
	}

    /**
     * Setter creationDate
     * @param {Date} value
     */
	public set creationDate(value: Date) {
		this._creationDate = value;
	}

	

 }