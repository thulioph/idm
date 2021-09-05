import GeniusAPI from '../../services/genius';
import LastFmAPI from '../../services/lastfm';
import WhoSampledAPI from '../../services/whosampled';
import MusicbrainzAPI from '../../services/musicbrainz';

const getArtistID = (query, arr) => {
  const element = arr.find(({ result }) => {
    const artistName = result.primary_artist.name;
    return artistName === query;
  })

  if (!element) return null;

  return element.result.primary_artist.id;
};

const searchFromGenius = async (query) => {
  const api = new GeniusAPI();

  const search = await api.search(query);
  const artistId = getArtistID(query, search);

  if (!artistId) return {};

  const data = await api.getArtist(artistId);

  return data;
};

const searchFromLastFM = async (query) => {
  const api = new LastFmAPI();

  const data = await api.getArtistInfo(query);
  const topTracks = await api.getArtistTopTracks(query);

  return { ...data, topTracks };
};

const searchFromWhoSampled = async (query) => {
  const api = new WhoSampledAPI();

  const data = await api.getArtistInfo(query);

  return data;
};

const searchFromMusicBrainz = async (mbid) => {
  const api = new MusicbrainzAPI();

  const data = await api.getArtistInfo(mbid);

  return data;
};

export default async (req, res) => {
  const { artist } = JSON.parse(req.body)

  if (!artist) res.status(400).json({});

  const genius = await searchFromGenius(artist);
  const lastfm = await searchFromLastFM(artist);
  const whoSampled = await searchFromWhoSampled(artist);

  let musicbrainz

  if (lastfm.mbid) {
    console.warn('lastFM', lastfm.mbid)
    musicbrainz = await searchFromMusicBrainz(lastfm.mbid)
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ genius, lastfm, whoSampled, musicbrainz });
};
