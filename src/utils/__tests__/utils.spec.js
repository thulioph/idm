import request from '../request';
import throwError from '../error';

describe('Utils', () => {

  describe('Request', () => {
    it('should return null if no URL is given', async () => {
      const myRequest = await request();
      expect(myRequest).toEqual(null);
    });
  })

  describe('Error', () => {
    it('should throw a new error', () => {
      expect((() => {
        throwError('here is my error message')
      })).toThrow();
    })
  })

});
