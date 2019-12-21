const mongoose = require('mongoose');

require('mongodb');
/**
 * Manages crud for oob mongo db documents
 */
class Database {
    /**
     * Sets up connection for mongo db to be used through composition.
     * @returns {Promise<void>}
     */
    constructor() {
      this.connect();
    }

    connect () {
      const mongoDB = 'mongodb://127.0.0.1/oob_migrate';
      const connectWithRetry = function() {
        return mongoose.connect(mongoDB, {useNewUrlParser: true}, function (err) {
          if (err) {
            console.warn('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
          }
        });
      }
      connectWithRetry()
      return mongoose;
    }
}

module.exports = Database;
