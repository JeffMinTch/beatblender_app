import { Track } from './track.model';
import { Sample } from './sample.model';
export class MyUploads {

    private _sets: Set<Set<Sample | Track>>;
    private _sampleList: Array<Sample>;
    private _trackList: Array<Track>;





    /**
     * Getter sets
     * @return {Set<Set<Sample }
     */
	public get sets(): Set<Set<Sample | Track>>  {
		return this._sets;
	}

    /**
     * Getter sampleList
     * @return {Array<Sample>}
     */
	public get sampleList(): Array<Sample> {
		return this._sampleList;
	}

    /**
     * Getter trackList
     * @return {Array<Track>}
     */
	public get trackList(): Array<Track> {
		return this._trackList;
	}

    /**
     * Setter sets
     * @param {Set<Set<Sample } value
     */
	public set sets(value: Set<Set<Sample | Track>> ) {
		this._sets = value;
	}

    /**
     * Setter sampleList
     * @param {Array<Sample>} value
     */
	public set sampleList(value: Array<Sample>) {
		this._sampleList = value;
	}

    /**
     * Setter trackList
     * @param {Array<Track>} value
     */
	public set trackList(value: Array<Track>) {
		this._trackList = value;
	}
    




}