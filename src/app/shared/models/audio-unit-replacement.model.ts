import { Sample } from './sample.model';
import { Track } from './track.model';

export class AudioUnitReplacement {

    private _deprecatedAudioUnit: Sample | Track;
    private _updatetAudioUnit: Sample | Track;


	constructor(deprecatedAudioUnit: Sample | Track , updatetAudioUnit: Sample | Track ) {
		this._deprecatedAudioUnit = deprecatedAudioUnit;
		this._updatetAudioUnit = updatetAudioUnit;
	}



    /**
     * Getter deprecatedAudioUnit
     * @return {Sample | Track }
     */
	public get deprecatedAudioUnit(): Sample | Track  {
		return this._deprecatedAudioUnit;
	}

    /**
     * Getter updatetAudioUnit
     * @return {Sample | Track }
     */
	public get updatetAudioUnit(): Sample | Track  {
		return this._updatetAudioUnit;
	}

    /**
     * Setter deprecatedAudioUnit
     * @param {Sample | Track } value
     */
	public set deprecatedAudioUnit(value: Sample | Track ) {
		this._deprecatedAudioUnit = value;
	}

    /**
     * Setter updatetAudioUnit
     * @param {Sample | Track } value
     */
	public set updatetAudioUnit(value: Sample | Track ) {
		this._updatetAudioUnit = value;
	}


}