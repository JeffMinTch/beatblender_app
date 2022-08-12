import { Artist } from './artist.model';
import { PaginationRequestParams } from './pagination-request-params.model';
export class ArtistPage extends PaginationRequestParams {

    private _artists: Array<Artist>;


    /**
     * Getter artists
     * @return {Array<Artist>}
     */
	public get artists(): Array<Artist> {
		return this._artists;
	}

    /**
     * Setter artists
     * @param {Array<Artist>} value
     */
	public set artists(value: Array<Artist>) {
		this._artists = value;
	}


}