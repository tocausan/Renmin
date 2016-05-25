'use strict';

describe('renmin.version module', function() {
  beforeEach(module('renmin.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
