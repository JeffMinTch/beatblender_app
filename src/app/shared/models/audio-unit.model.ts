import { ArtistAlias } from "./artist-alias.model";
import { Artist } from "./artist.model"

export class AudioUnit {
    

    private _audioUnitID: string;
    private _artistAlias: ArtistAlias;
    private _title: string;
    private _creator: Artist;
    private _audioFileName: string;
    private _imageFileName: string;
    private _downloads: number;
    private _streams: number;
    private _uploadDate: Date;




	constructor(audioUnitID: string, artistAlias: ArtistAlias, title: string, creator: Artist, audioFileName: string, imageFileName: string, downloads: number, streams: number, uploadDate: Date) {
		this._audioUnitID = audioUnitID;
		this._artistAlias = artistAlias;
		this._title = title;
		this._creator = creator;
		this._audioFileName = audioFileName;
		this._imageFileName = imageFileName;
		this._downloads = downloads;
		this._streams = streams;
		this._uploadDate = uploadDate;
	}
	


    /**
     * Getter audioUnitID
     * @return {string}
     */
	public get audioUnitID(): string {
		return this._audioUnitID;
	}

    /**
     * Getter artistAlias
     * @return {ArtistAlias}
     */
	public get artistAlias(): ArtistAlias {
		return this._artistAlias;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter creator
     * @return {Artist}
     */
	public get creator(): Artist {
		return this._creator;
	}

    /**
     * Getter audioFileName
     * @return {string}
     */
	public get audioFileName(): string {
		return this._audioFileName;
	}

    /**
     * Getter imageFileName
     * @return {string}
     */
	public get imageFileName(): string {
		return this._imageFileName;
	}

    /**
     * Getter downloads
     * @return {number}
     */
	public get downloads(): number {
		return this._downloads;
	}

    /**
     * Getter streams
     * @return {number}
     */
	public get streams(): number {
		return this._streams;
	}

    /**
     * Getter uploadDate
     * @return {Date}
     */
	public get uploadDate(): Date {
		return this._uploadDate;
	}

    /**
     * Setter audioUnitID
     * @param {string} value
     */
	public set audioUnitID(value: string) {
		this._audioUnitID = value;
	}

    /**
     * Setter artistAlias
     * @param {ArtistAlias} value
     */
	public set artistAlias(value: ArtistAlias) {
		this._artistAlias = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter creator
     * @param {Artist} value
     */
	public set creator(value: Artist) {
		this._creator = value;
	}

    /**
     * Setter audioFileName
     * @param {string} value
     */
	public set audioFileName(value: string) {
		this._audioFileName = value;
	}

    /**
     * Setter imageFileName
     * @param {string} value
     */
	public set imageFileName(value: string) {
		this._imageFileName = value;
	}

    /**
     * Setter downloads
     * @param {number} value
     */
	public set downloads(value: number) {
		this._downloads = value;
	}

    /**
     * Setter streams
     * @param {number} value
     */
	public set streams(value: number) {
		this._streams = value;
	}

    /**
     * Setter uploadDate
     * @param {Date} value
     */
	public set uploadDate(value: Date) {
		this._uploadDate = value;
	}


	




    
   

    
}