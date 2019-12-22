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
      try {
        const mongoDB = 'mongodb://database/oob_migrate';
        const connectWithRetry = () => {
          return mongoose.connect(mongoDB, {useNewUrlParser: true}, function (err) {
            if (err) {
              console.warn('Failed to connect to mongo on startup - retrying in 5 sec', err);
              setTimeout(connectWithRetry, 5000);
            } else {
              console.log('Connection succeeded.')
            }
          });
        }
        connectWithRetry()
        return mongoose;
      } catch (e) {

      }
    }
}

module.exports = Database;
