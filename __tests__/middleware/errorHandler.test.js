import { jest } from '@jest/globals';
import { errorHandler } from '../../src/middleware/errorHandler.js';

describe('errorHandler middleware', () => {
    it('should return 500 and default message in production mode', () => {
        process.env.NODE_ENV = 'production';

        const err = new Error();
        const req = { method: 'GET', originalUrl: '/test' };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        errorHandler(err, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Something went wrong',
        });
    });

    it('should include stack trace in development mode', () => {
        process.env.NODE_ENV = 'development';

        const err = new Error('Test error');
        const req = { method: 'POST', originalUrl: '/example' };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        errorHandler(err, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json.mock.calls[0][0]).toMatchObject({
            success: false,
            error: 'Test error',
            stack: expect.any(String),
        });
    });
});
