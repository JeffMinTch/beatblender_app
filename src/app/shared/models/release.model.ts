import { Sample } from './sample.model';
import { Track } from './track.model';
export class Release {

    
    private _track: Track;
    private _samples: Array<Sample>;


	constructor(track: Track, samples: Array<Sample>) {
		this._track = track;
		this._samples = samples;
	}


    /**
     * Getter track
     * @return {Track}
     */
	public get track(): Track {
		return this._track;
	}

    /**
     * Getter samples
     * @return {Array<Sample>}
     */
	public get samples(): Array<Sample> {
		return this._samples;
	}

    /**
     * Setter track
     * @param {Track} value
     */
	public set track(value: Track) {
		this._track = value;
	}

    /**
     * Setter samples
     * @param {Array<Sample>} value
     */
	public set samples(value: Array<Sample>) {
		this._samples = value;
	}


    


}