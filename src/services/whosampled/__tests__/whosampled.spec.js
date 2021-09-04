import WhoSampledAPI from '../index';

describe('WhoSampled API', () => {
	let api, spy;

	beforeEach(() => {
		api = new WhoSampledAPI()
		spy = jest.spyOn(api, 'getData').mockImplementation(() => [{}])
	})

	it('should not make the request when there is no artist name', async () => {
		await api.getArtistInfo('')

		expect(spy).toHaveBeenCalledTimes(0)
	})

	it('should make the request with correct arguments', async () => {
		await api.getArtistInfo('2 pac')

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith('https://whosampled-scraper.herokuapp.com/artist/2%20pac')
	})
})