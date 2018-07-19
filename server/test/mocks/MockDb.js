module.exports = class MockDb {
	constructor(name, tables) {
		this.name = name || 'db';
		this.tables = {};
		this.maxListeners = 1;
    this.connector = {
      execute: (dbQuery, callback) => {
        callback(false, {})
      }
    }

    if (tables) {
      for (const table of tables) {
        this.tables[table] = {};
      }
    }
	}

	isActual(tables, cb) {
		for (const table of tables) {
			if (!this.tables[table]) return cb(null, false);
		}
		return cb(null, true);
	}

	autoupdate(tables, cb) {
		for (const table of tables) {
			if (!this.tables[table]) this.tables[table] = {};
		}
		return cb(null);
	}

	setMaxListeners(number) {
		this.maxListeners = number;
	}
}
