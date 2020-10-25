import config from '../../config';
import { request, throwError } from '../../utils';

const formatArtistPayload = (payload) => {
  const {
    alternate_names,
    facebook_name,
    image_url,
    instagram_name,
    twitter_name,
    url,
    header_image_url,
  } = payload.artist;

  let obj = {
    aka: alternate_names,
    avatar: image_url,
    displayImage: header_image_url,
    source: url
  }

  if (facebook_name) {
    obj.social = {
      ...obj.social,
      facebook: `https://www.facebook.com/${facebook_name}`
    }
  }

  if (instagram_name) {
    obj.social = {
      ...obj.social,
      instagram: `https://www.instagram.com/${instagram_name}`
    }
  }

  if (twitter_name) {
    obj.social = {
      ...obj.social,
      twitter: `https://www.twitter.com/${twitter_name}`
    }
  }

  return obj;
}

class GeniusAPI {
  static URL_BASE = config.genius.url
  static TOKEN = config.genius.accessToken

  static getSearchURL(query) {
    return `${GeniusAPI.URL_BASE}/search?q=${encodeURIComponent(query)}`
  }

  async search(query = null) {
    if (!query) return query

    const URL = GeniusAPI.getSearchURL(query)
    const data = await this.getData(URL)

    return data.hits
  }

  static getArtistURL(id) {
    return `${GeniusAPI.URL_BASE}/artists/${id}`
  }

  async getArtist(artistId = null) {
    if (!artistId) return artistId

    const URL = GeniusAPI.getArtistURL(artistId)
    const data = await this.getData(URL)

    return formatArtistPayload(data)
  }

  static getSongsURL(id) {
    return `${GeniusAPI.URL_BASE}/songs/${id}`
  }

  async getSongs(songId = null) {
    if (!songId) return songId

    const URL = GeniusAPI.getSongsURL(songId)
    return await this.getData(URL)
  }

  async getData(url) {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${GeniusAPI.TOKEN}`,
      },
    }

    const response = await request(url, config)
    const data = await response.json()

    const hasError = data.error || data.error_description;

    if (hasError) {
      throwError({ ...data, message: data.error_description });
    }
    
    return data.response
  }
}

export default GeniusAPI
