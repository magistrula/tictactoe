import { makeRange } from '../date';

describe('date', () => {
  describe('makeRange', () => {
    it('makes range given valid id', () => {
      expect(makeRange('-12m')).not.toBeNull();
    });
    it('throws given invalid id', () => {
      expect(() => makeRange('foo')).toThrow();
    });
  });
});
