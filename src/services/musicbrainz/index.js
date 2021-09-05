import { request } from '../../utils';

class MusicbrainzAPI {
	static getRequestURL(mbid) {
		return `https://musicbrainz.org/ws/2/artist/${encodeURIComponent(mbid)}?inc=aliases&fmt=json`
	}

	async getArtistInfo(mbid = null) {
		if (!mbid) return mbid;

		const URL = MusicbrainzAPI.getRequestURL(mbid);
		const data = await this.getData(URL);

		if (!data) return {};

		return data;
	}

	async getData(url) {
    const config = {
      method: 'GET',
    };

    const response = await request(url, config)
    const data = await response.json()

    return data
  }
}

export default MusicbrainzAPI;
