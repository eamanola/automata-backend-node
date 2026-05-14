const supertest = require('supertest');

const appBuilder = require('./app');

let api;

describe('automata-app', () => {
  beforeAll(() => {
    api = supertest(appBuilder({ db: global.db }));
  });

  it('should start', async () => {
    const { status } = await api.get('/health');
    expect(status).toBe(200);
  });

  it('should create and authenticate users', async () => {
    const credendials = { email: `foo${Math.random()}@example.com`, password: 'bar' };
    const { status: signupStatus } = await api.post('/signup').send(credendials);
    expect(signupStatus).toBe(201);

    const { status, body } = await api.post('/login').send(credendials);
    expect(status).toBe(200);
    expect(body.token).toBeTruthy();
  });
});
