import LastFmAPI from '../index'

const mockedApiData = {
  artist: {
    bio: {
      summary: '',
      links: { link: { href: '' } }
    },
    tags: {
      tag: [
        { name: 'rap' }, { name: 'hip-hop' }
      ]
    },
    similar: { artist: '' }
  },
  toptracks: {
    track: [
      {
        image: '',
        name: '',
        playcount: '',
        url: ''
      }
    ]
  }
};

describe('LastFM API', () => {
  let api
  let spyGetData

  beforeEach(() => {
    api = new LastFmAPI()

    spyGetData = jest
      .spyOn(api, 'getData')
      .mockImplementation(() => mockedApiData)
  })

  describe('Artist', () => {
    it('should return null if no argument is given', async () => {
      const artist = await api.getArtistInfo()
      expect(artist).toEqual(null)
    })

    it('should call getData with correct arguments', async () => {
      await api.getArtistInfo('2 pac')

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith('https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=09348b1f3d5b4f6be5f9002755bf0587&format=json&artist=2%20pac')
    })

    it('should return an empty object when there is no artist info', async () => {
      spyGetData.mockImplementation(() => null)

      const data = await api.getArtistInfo('2 pac')
      expect(data).toEqual({})
    })

    it('should return the expected object', async () => {
      const data = await api.getArtistInfo('2 pac')
      expect(data).toEqual({
        bio: '',
        images: undefined,
        mbid: undefined,
        similar: '',
        source: '',
        tags: ['rap', 'hip-hop']
      })
    })
  })

  describe('Artist - Top Tracks', () => {
    it('should return null if no argument is given', async () => {
      const topTracks = await api.getArtistTopTracks()
      expect(topTracks).toEqual(null)
    })
    
    it('should call getData with correct arguments', async () => {
      await api.getArtistTopTracks('2 Pac')

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith('https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=09348b1f3d5b4f6be5f9002755bf0587&format=json&artist=2%20Pac&limit=10')
    })

    it('should return an empty object when there is no top tracks info', async () => {
      spyGetData.mockImplementation(() => null);

      const data = await api.getArtistTopTracks('2 Pac');
      expect(data).toEqual({});
    });
  })

  describe('Track', () => {
    it('should return null if no argument is given', async () => {
      const trackInfo = await api.getTrackInfo()
      expect(trackInfo).toEqual(null)
    })
    
    it('should call getData with correct arguments', async () => {
      await api.getTrackInfo('2 Pac', 'Dear Mama')

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith('https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=09348b1f3d5b4f6be5f9002755bf0587&format=json&artist=2%20Pac&track=Dear%20Mama')
    })
  })

  describe('Album', () => {
    it('should return null if no argument is given', async () => {
      const albumInfo = await api.getAlbumInfo()
      expect(albumInfo).toEqual(null)
    })
    
    it('should call getData with correct arguments', async () => {
      await api.getAlbumInfo('2 Pac', 'All Eyez on Me')

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith('https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=09348b1f3d5b4f6be5f9002755bf0587&format=json&artist=2%20Pac&album=All%20Eyez%20on%20Me')
    })
  })

})