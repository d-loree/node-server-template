import { asyncHandler } from '../../src/utils/asyncHandler.js';
import { jest } from '@jest/globals';

describe('asyncHandler', () => {
  it('should call the wrapped function', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const handler = jest.fn().mockResolvedValue();

    await asyncHandler(handler)(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it('should catch errors and call next with the error', async () => {
    const req = {};
    const res = {};
    const error = new Error('Test error');
    const next = jest.fn();
    const handler = jest.fn().mockRejectedValue(error);

    await asyncHandler(handler)(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
