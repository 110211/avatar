const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://nxhdev:Caube_2k2@cluster0.ekk19.mongodb.net'

class database {
    constructor(url) {
        this.url = url
        this.connect()
    }

    connect() {
        console.log("connecting...")
        mongoClient.connect(this.url, (async function (err, db) {
            if (err) throw(err);
            // console.log(db);
            this.db = db;
        }).bind(this));
    }

    async waitForConnect() {
        while (1) {
            if (typeof this.db !== "undefined") {
                break;
            }
            await sleep(5000);
        }
    }
    async createCollection(dbName, name) {
        await this.waitForConnect()
        dbo.createCollection(name, function(err, res) {
            if (err) return err;
            console.log("ok");
            return true;
        })
    }

    async insertData(dbName, collectionName, arrData) {
        await this.waitForConnect()
        let dbo = this.db.db(dbName);
        dbo.collection(collectionName).insertOne(arrData, function(err, res) {
            if (err) return err;
            return true;
        })
    }

    async getData(dbName, collectionName) {
        await this.waitForConnect()
        let dbo = this.db.db(dbName);
        return dbo.collection(collectionName).find({}).toArray()
    }

    async findData(dbName, collectionName, ArrFind) {
        await this.waitForConnect()
        let dbo = this.db.db(dbName);
        return dbo.collection(collectionName).find(ArrFind).toArray()
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = new database(url);