import { AudioUnit } from "./audio-unit.model";

export class Track {
    
    private _trackID: string;
    private _audioUnit: AudioUnit;
    private _releaseArtistName: string;
    private _audioFileName: string;
    private _imageFileName: string;
    private _licenseeName: string;


	constructor(trackID: string, audioUnit: AudioUnit, releaseArtistName: string, audioFileName: string, imageFileName: string, licenseeName: string) {
		this._trackID = trackID;
		this._audioUnit = audioUnit;
		this._releaseArtistName = releaseArtistName;
		this._audioFileName = audioFileName;
		this._imageFileName = imageFileName;
		this._licenseeName = licenseeName;
	}



    /**
     * Getter trackID
     * @return {string}
     */
	public get trackID(): string {
		return this._trackID;
	}

    /**
     * Getter audioUnit
     * @return {AudioUnit}
     */
	public get audioUnit(): AudioUnit {
		return this._audioUnit;
	}

    /**
     * Getter releaseArtistName
     * @return {string}
     */
	public get releaseArtistName(): string {
		return this._releaseArtistName;
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
     * Getter licenseeName
     * @return {string}
     */
	public get licenseeName(): string {
		return this._licenseeName;
	}

    /**
     * Setter trackID
     * @param {string} value
     */
	public set trackID(value: string) {
		this._trackID = value;
	}

    /**
     * Setter audioUnit
     * @param {AudioUnit} value
     */
	public set audioUnit(value: AudioUnit) {
		this._audioUnit = value;
	}

    /**
     * Setter releaseArtistName
     * @param {string} value
     */
	public set releaseArtistName(value: string) {
		this._releaseArtistName = value;
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
     * Setter licenseeName
     * @param {string} value
     */
	public set licenseeName(value: string) {
		this._licenseeName = value;
	}

  


}