import config from '../../config';
import { request } from '../../utils'

class WhoSampledAPI {
	static URL_BASE = config.whoSampled.url;

	static getArtistURL(artistName) {
		return `${WhoSampledAPI.URL_BASE}/artist/${encodeURIComponent(artistName)}`;
	}

	async getArtistInfo(artistName = null) {
		if (!artistName) return artistName;

		const URL = WhoSampledAPI.getArtistURL(artistName);
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

export default WhoSampledAPI