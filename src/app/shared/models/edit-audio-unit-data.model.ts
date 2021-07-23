import { Sample } from './sample.model';
import { Track } from './track.model';
import { AudioUnitDataType } from './audio-unit-data-type.model';

export interface IEditAudioUnitData {
  audioUnitDataType: AudioUnitDataType,
  audioUnit: Sample | Track;
}