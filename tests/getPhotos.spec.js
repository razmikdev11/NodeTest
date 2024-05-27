const request = require('supertest');
const app = require('../server');

describe('Test photos routes', () => {
  it('GET /api/photos 10 items array', () => {
    return request(app)
      .get('/api/photos')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined();
        expect(response.body.message).toBeDefined();
        expect(response.body.status).toBeDefined();
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("photo succed");
        expect(response.body.message).toEqual("photo succed");
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length === 10).toBe(true);

        const firstItem = response.body.data[0];

        expect(firstItem.publishedDate).toBeDefined();
        expect(firstItem.tags).toBeDefined();
        expect(firstItem.url).toBeDefined();
      });
  });
})