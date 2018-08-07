'use strict';

module.exports = class MockDb {
  /**
   * @description inits the database with the provided name and tables
   * @param {String} name the name of the database
   * @param {String[]} tables list of table names
   */
	constructor(name, tables) {
		this.name = name || 'db';
		this.tables = {};
		this.maxListeners = 1;
    this.connector = {
      execute: (dbQuery, callback) => {
        callback(false, {});
      }
    };

    if (tables) {
      for (const table of tables) {
        this.tables[table] = {};
      }
    }
	}

  /**
   * @description Mock implementation of the isActual method
   * @param {String[]} tables list of table names
   * @param {Function} cb callback to be used upon completion
   * @return {Undefined} returns the callback to break out
   */
	isActual(tables, cb) {
		for (const table of tables) {
			if (!this.tables[table]) return cb(null, false);
		}
		cb(null, true);
	}

  /**
   * @description Mock implementation of the autoupdate method
   * @param {String[]} tables list of table names
   * @param {Function} cb callback to be used upon completion
   */
	autoupdate(tables, cb) {
		for (const table of tables) {
			if (!this.tables[table]) this.tables[table] = {};
		}
		cb(null);
	}

  /**
   * @description Mock implementation of the setMaxListeners method
   * @param {number} number the number of listeners to be set
   */
	setMaxListeners(number) {
		this.maxListeners = number;
	}
};
