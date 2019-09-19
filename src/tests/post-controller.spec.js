const request = require('supertest');
const toBeType = require('jest-tobetype');
/** Relative imports */
const app = require('../server');

expect.extend(toBeType);

describe('Get all posts end-point', () => {
    it('should retrieve all posts from database', async () => {
      const res = await request(app)
        .get('/api/posts');
      expect(res.statusCode).toEqual(200)
      expect(res).toBeType('object')
    });
});