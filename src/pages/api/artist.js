import GeniusAPI from '../../services/genius';
import LastFmAPI from '../../services/lastfm';

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

export default async (req, res) => {
  const { artist } = JSON.parse(req.body)

  if (!artist) res.status(400).json({});

  const genius = await searchFromGenius(artist);
  const lastfm = await searchFromLastFM(artist);

  res.status(200).json({ genius, lastfm });
};
