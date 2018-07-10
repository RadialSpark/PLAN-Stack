function MockDb(name, tables) {
  this.name = name || 'db';
  this.tables = {};
  this.maxListeners = 1;
  if (tables) {
    for (const table of tables) {
      this.tables[table] = {};
    }
  }
}

MockDb.prototype.isActual = function(tables, cb) {
  for (const table of tables) {
    if (!this.tables[table]) return cb(null, false);
  }
  return cb(null, true);
}

MockDb.prototype.autoupdate = function(tables, cb) {
  for (const table of tables) {
    if (!this.tables[table]) this.tables[table] = {};
  }
  return cb(null);
}

MockDb.prototype.setMaxListeners = function(number) {
  this.maxListeners = number;
}

module.exports = MockDb;
