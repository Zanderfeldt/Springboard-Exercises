describe('performance', function() {
  for (let i = 0; i < 10000; i++) {
    it('should pass', function() {
      expect(true).toBe(true);
    });
    it('should fail', function() {
      expect(true).toBe(false);
    });
  }
});
