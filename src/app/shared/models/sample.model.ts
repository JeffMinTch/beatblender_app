import { AudioUnit } from './audio-unit.model';
// export interface Sample {
//     queuePosition: number,
//     id: string,
//     artistName: string,
//     sampleTitle: string,
//     audioFile: string,
//     sampleImage: string,
//     audioFileDownLoadUri: string,
//     imageDownLoadUri: string,
//     genre: string,
//     trackType: string,
//     songKey: string,
//     region: string,
//     audioDescription: string,
//     sampleID: number,
//     samplePrice: string
// }
// export interface Sample {
//     sampleID: string;
//     title: string;
//     genre: string;
//     tempo: number;
//     moods: Array<string>;
//     tags: Array<string>;
//     audioFileName: string,
//     imageFileName: string;
//     lep: number;
//     artistName: string;
// }


export class Sample {

    private _sampleID: string;
    private _audioUnit: AudioUnit;
    private _title: string;
    private _genre: string;
    private _tempo: number;
    private _moods: Array<string>;
    private _tags: Array<string>;





	constructor(sampleID: string, audioUnit: AudioUnit, title: string, genre: string, tempo: number, moods: Array<string>, tags: Array<string>) {
		this._sampleID = sampleID;
		this._audioUnit = audioUnit;
		this._title = title;
		this._genre = genre;
		this._tempo = tempo;
		this._moods = moods;
		this._tags = tags;
	}



    /**
     * Getter sampleID
     * @return {string}
     */
	public get sampleID(): string {
		return this._sampleID;
	}

    /**
     * Getter audioUnit
     * @return {AudioUnit}
     */
	public get audioUnit(): AudioUnit {
		return this._audioUnit;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Getter genre
     * @return {string}
     */
	public get genre(): string {
		return this._genre;
	}

    /**
     * Getter tempo
     * @return {number}
     */
	public get tempo(): number {
		return this._tempo;
	}

    /**
     * Getter moods
     * @return {Array<string>}
     */
	public get moods(): Array<string> {
		return this._moods;
	}

    /**
     * Getter tags
     * @return {Array<string>}
     */
	public get tags(): Array<string> {
		return this._tags;
	}

    /**
     * Setter sampleID
     * @param {string} value
     */
	public set sampleID(value: string) {
		this._sampleID = value;
	}

    /**
     * Setter audioUnit
     * @param {AudioUnit} value
     */
	public set audioUnit(value: AudioUnit) {
		this._audioUnit = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

    /**
     * Setter genre
     * @param {string} value
     */
	public set genre(value: string) {
		this._genre = value;
	}

    /**
     * Setter tempo
     * @param {number} value
     */
	public set tempo(value: number) {
		this._tempo = value;
	}

    /**
     * Setter moods
     * @param {Array<string>} value
     */
	public set moods(value: Array<string>) {
		this._moods = value;
	}

    /**
     * Setter tags
     * @param {Array<string>} value
     */
	public set tags(value: Array<string>) {
		this._tags = value;
	}


}