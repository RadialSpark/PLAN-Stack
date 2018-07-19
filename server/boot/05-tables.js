'use strict';

const TABLES = [
  'User',
  'ACL',
  'Role',
  'RoleMapping',
  'AccessToken'
];

module.exports = (server) => {
  const db = server.dataSources.db;
  // loopback sometimes throws warnings when dealing with large amounts of tables and relations
  db.setMaxListeners(TABLES.length * 2);
  db.connector.execute('CREATE SCHEMA IF NOT EXISTS PlanSchema', (err, results) => {
    db.isActual(TABLES, (err, isActual) => {
      if (err) return callback(err);
      if (isActual) {
          console.log('Tables found .. skipping creation');
      }
      db.autoupdate(TABLES, (err) => {
          if (err) return callback(err);
          console.log('Tables created');
      });
    });
  });
};
