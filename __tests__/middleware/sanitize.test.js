import { jest } from '@jest/globals';
import { sanitizeMiddleware } from '../../src/middleware/sanitize.js';

describe('sanitizeMiddleware', () => {
  it('sanitizes script tags from body, query, and params', async () => {
    const req = {
      body: { key: '<script>alert("xss")</script>' },
      query: { search: '<svg onload=alert(1)>' },
      params: { param: '<script>malicious</script>' },
    };
    const res = {};
    const next = jest.fn();

    sanitizeMiddleware(req, res, next);

    expect(req.body.key).not.toMatch(/<script>/);
    expect(req.query.search).not.toMatch(/<svg/);
    expect(req.params.param).not.toMatch(/<script>/);
    expect(next).toHaveBeenCalled();
  });
});
