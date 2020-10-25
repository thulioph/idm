import config from '../../config';
import { request, throwError } from '../../utils';

const formatArtistPayload = (payload) => {
  const { artist } = payload;

  return {
    bio: artist.bio.summary,
    source: artist.bio.links.link.href,
    tags: artist.tags.tag.map(({ name }) => name),
    similar: artist.similar.artist,
    mbid: artist.mbid,
    images: artist.image,
  };
};

const formatTopTracksPayload = (payload) => {
  const { track } = payload.toptracks;

  return track.map(({ image, name, playcount, url }) => ({
    image,
    name,
    playcount,
    url,
  }));
}

class LastFmAPI {
  static URL_BASE = config.lastFm.url;
  static KEY = config.lastFm.key;

  static getBaseURL(method) {
    return `${LastFmAPI.URL_BASE}/?method=${method}&api_key=${LastFmAPI.KEY}&format=json`;
  }

  static getArtistInfoURL(artistName) {
    const artist = encodeURIComponent(artistName);
    const methodUrl = LastFmAPI.getBaseURL('artist.getInfo');

    return `${methodUrl}&artist=${artist}`;
  }

  async getArtistInfo(artistName = null) {
    if (!artistName) return artistName;

    const URL = LastFmAPI.getArtistInfoURL(artistName);
    const data = await this.getData(URL);

    if (!data) return {}

    return formatArtistPayload(data);
  }

  static getTrackInfoURL(artistName, trackName) {
    const artist = encodeURIComponent(artistName)
    const track = encodeURIComponent(trackName)
    const methodUrl = LastFmAPI.getBaseURL('track.getInfo')

    return `${methodUrl}&artist=${artist}&track=${track}`
  }

  async getTrackInfo(artistName = null, trackName = null) {
    if (!artistName || !trackName) return artistName

    const URL = LastFmAPI.getTrackInfoURL(artistName, trackName)
    const data = await this.getData(URL);

    return data;
  }

  static getAlbumInfoURL(artistName, albumName) {
    const artist = encodeURIComponent(artistName)
    const album = encodeURIComponent(albumName)
    const methodUrl = LastFmAPI.getBaseURL('album.getInfo')

    return `${methodUrl}&artist=${artist}&album=${album}`
  }

  async getAlbumInfo(artistName = null, albumName = null) {
    if (!artistName || !albumName) return artistName

    const URL = LastFmAPI.getAlbumInfoURL(artistName, albumName)
    return await this.getData(URL)
  }

  static getArtistTopTracksURL(artistName, limit = 10) {
    const artist = encodeURIComponent(artistName)
    const methodUrl = LastFmAPI.getBaseURL('artist.gettoptracks')

    return `${methodUrl}&artist=${artist}&limit=${limit}`
  }

  async getArtistTopTracks(artistName = null, limit) {
    if (!artistName) return artistName

    const URL = LastFmAPI.getArtistTopTracksURL(artistName, limit);
    const data = await this.getData(URL);

    if (!data) return {};

    return formatTopTracksPayload(data);
  }

  async getData(url) {
    const config = {
      method: 'GET',
    };

    const response = await request(url, config)
    const data = await response.json()

    const hasError = data.error

    if (hasError) {
      throwError({ ...data, message: data.message });
    }

    return data
  }
}

export default LastFmAPI
