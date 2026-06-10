const supertest = require('supertest');
const { router: restRouter } = require('automata-rest');

const appBuilder = require('./app');

describe('automata-rest', () => {
  it('should save, edit & retrieve resources', async () => {
    const { db } = global;

    const table = { columns: [{ name: 'foo', required: true, type: 'string' }], name: 'test' };
    const router = restRouter(null, { db, table, userRequired: false });

    const app = appBuilder({ db });
    app.use('/test', router);
    const api = supertest(app);

    const post = await api.post('/test').send({ foo: 'bar' });
    expect(post.status).toBe(201);

    const { result: created } = post.body;
    const { id } = created;
    expect(created).toEqual(expect.objectContaining({ foo: 'bar' }));

    const get = await api.get(`/test/${id}`);
    expect(get.status).toBe(200);
    expect(get.body.result).toEqual(created);

    const put = await api.put(`/test/${id}`).send({ ...created, foo: 'baz' });
    expect(put.status).toBe(200);
    expect(put.body.result).toEqual(expect.objectContaining({ foo: 'baz', id }));

    const get2 = await api.get(`/test/${id}`);
    expect(get2.status).toBe(200);
    expect(get2.body.result).toEqual(expect.objectContaining({ foo: 'baz', id }));

    // update many
    const post2 = await api.post('/test').send({ foo: 'bar' });
    const { result: created2 } = post2.body;
    const { id: id2 } = created2;

    const put2 = await api.put('/test').send([
      { ...created, foo: 'baz2' },
      { ...created2, foo: 'baz3' },
    ]);
    const { results } = put2.body;
    expect(results.find(({ id: aId }) => aId === id))
      .toEqual(expect.objectContaining({ foo: 'baz2', id }));
    expect(results.find(({ id: aId }) => aId === id2))
      .toEqual(expect.objectContaining({ foo: 'baz3', id: id2 }));
    // update many

    await db.dropTable(table.name);
  });
});
