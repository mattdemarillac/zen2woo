const mongoose = require('mongoose')
/**
 * Manages crud for oob mongo db documents
 */
class Database {
  /**
   * Sets up connection for mongo db to be used through composition.
   * @returns {Promise<void>}
   */
  static async connect () {
    try {
      const mongoDB = 'mongodb://localhost:27017/oob_migrate'

      const connectWithRetry = async () => {
        return mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
          if (err) {
            console.warn('Failed to connect to mongo on startup - retrying in 5 sec', err)
            setTimeout(connectWithRetry, 5000)
          } else {
            console.log('MongoDB Connection succeeded.')
          }
        })
      }

      const conn = await connectWithRetry()

      this.setConnection(conn)
    } catch (e) {

    }
  }

  static setConnection (db) {
    this.db = db
  }

  static getConnection () {
    return this.db
  }
}

module.exports = Database
