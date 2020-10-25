import GeniusAPI from '../index'

const mockedApiData = {
  artist: {
    alternate_names: ['name 01', 'name 02'],
    facebook_name: 'fb-url',
    image_url: 'main-img-here',
    instagram_name: 'ig-url',
    twitter_name: 'tw-url',
    url: 'genius-url',
    header_image_url: 'header-img-here',
  },
};

describe('Genius API', () => {
  let api
  let spyGetData

  beforeEach(() => {
    api = new GeniusAPI()

    spyGetData = jest
      .spyOn(api, 'getData')
      .mockImplementation(() => mockedApiData)
  })

  describe('Search', () => {
    it('should return null if no argument is given', async () => {
      const search = await api.search()
      expect(search).toEqual(null)
    })

    it('should call getData with correct arguments', async () => {
      await api.search('2 pac')

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith('https://api.genius.com/search?q=2%20pac')
    })
  })

  describe('Artist', () => {
    it('should return null if no argument is given', async () => {
      const artist = await api.getArtist()
      expect(artist).toEqual(null)
    })

    it('should call getData with correct arguments', async () => {
      const artistID = '1421'

      await api.getArtist(artistID)

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith(`https://api.genius.com/artists/${artistID}`)
    })

    it('should return the expected object', async () => {
      const data = await api.getArtist('1421');

      expect(data).toEqual({
        aka: ['name 01', 'name 02'],
        avatar: 'main-img-here',
        displayImage: 'header-img-here',
        source: 'genius-url',
        social: {
          facebook: 'https://www.facebook.com/fb-url',
          instagram: 'https://www.instagram.com/ig-url',
          twitter: 'https://www.twitter.com/tw-url',
        },
      });
    });

    it('should not return social when there is nothing associated', async () => {
      spyGetData.mockImplementation(() => ({
        artist: {
          ...mockedApiData.artist,
          twitter_name: null,
        }
      }))

      const data = await api.getArtist('1421');
      expect(data).not.toHaveProperty('social.twitter')
    })
    
  })

  describe('Songs', () => {
    it('should return null if no argument is given', async () => {
      const songs = await api.getSongs()
      expect(songs).toEqual(null)
    })

    it('should call getData with correct arguments', async () => {
      const songId = '90473'

      await api.getSongs(songId)

      expect(spyGetData).toHaveBeenCalledTimes(1)
      expect(spyGetData).toHaveBeenCalledWith(`https://api.genius.com/songs/${songId}`)
    })
  })

})