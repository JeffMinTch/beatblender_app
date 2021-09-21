import { Sample } from './sample.model';
import { AudioUnitDataType } from './audio-unit-data-type.model';

export interface IEditAudioUnitData {
  audioUnitDataType: AudioUnitDataType,
  sample: Sample;
}