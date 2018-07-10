'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockServer = require(`${PROJECT_DIR}/server/test/mocks/MockServer`);
const MockDb = require(`${PROJECT_DIR}/server/test/mocks/MockDb`)
const tables = require(`${PROJECT_DIR}/server/boot/05-tables`);
const expect = require('chai').expect;

describe('Tables boot script', () => {
  it('should create the tables if they don\'t exist', (done) => {
    let db = new MockDb();
    let server = new MockServer(db);
    tables(server);
    expect(Object.keys(server.dataSources.db.tables).length).to.be.above(0);
    done();
  });
  it('should create the tables that do not exist', (done) => {
    let db = new MockDb('db', ['User']);
    let server = new MockServer(db);
    expect(Object.keys(server.dataSources.db.tables).length).to.equal(1);
    tables(server);
    expect(Object.keys(server.dataSources.db.tables).length).to.be.above(1);
    done();
  });
});
