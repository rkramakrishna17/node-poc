import { MongoClient, Db, Collection, CollectionCreateOptions, FindOneOptions, ObjectId } from 'mongodb';

export class MongoService {

    /**
     * initializing dependencies
     */
    private _mongo = MongoClient;

    private _mongoUrl = "mongodb://localhost:27017/";
    static _connection: any;
    static _dataBase: any | Db;

    private dataBaseName = 'node';

    /**
     * According to mongo a connection has to be established only once and use the same connection multiple times as TCP connections are expensive.
     */
    private _connectMongo = (callback?: (...args: any[]) => void): void => {
        this._mongo.connect(this._mongoUrl, { useNewUrlParser: true }, (error, connection) => {
            if (error) {
                throw (error);
            } else {
                MongoService._connection = connection;
                callback && callback();
            }
        })
    }

    /**
     * connect to database from connection
     */
    private _connectDatabase = (callback?: (...args: any[]) => void): void => {
        MongoService._dataBase = MongoService._connection.db(this.dataBaseName);
        callback && callback(MongoService._dataBase);
    }

    /**
     * get the data base (Internal method)
     */
    private _getDataBase = (s: (...args: any[]) => void): void => {
        s(MongoService._dataBase);
    }

    /**
     * internal get collection by table name
     */
    private _getCollection = (tableName: string, s: (...args: any[]) => void): void => {
        this._getDataBase((db: Db) => {
            s(db.collection(tableName), db);
        })
    }

    /**
     * internal create collection
     */
    private _createCollection = (tableName: string, options: CollectionCreateOptions, s: (...args: any[]) => void): void => {
        this._getDataBase((db: Db) => {
            db.createCollection(tableName, options, (error, result: Collection) => {
                if (error) {
                    throw (error);
                } else if (result) {
                    s(result);
                }
            })
        });
    }

    /**
     * exposed get collection method
     */
    getCollection = (tableName: string, s: (...args: any[]) => void): void => {
        this._getCollection(tableName, (collection: Collection) => {
            s(collection);
        })
    }

    /**
     * exposed create collection
     */
    createCollection = (tableName: string, s: (...args: any[]) => void, options?: CollectionCreateOptions): void => {
        this._createCollection(tableName, options || {}, (result: Collection) => {
            s(result);
        })
    }

    /**
     * exposed insert into collection
     */
    insertOne = (tableName: string, data: object, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        this._getCollection(tableName, (collection: Collection) => {
            collection.insertOne(data, (error, response) => {
                if (!error && response) {
                    let insertedId = response.insertedId.toString();
                    if (insertedId && insertedId.length > 0) {
                        this.findOne(tableName, {
                            "_id": insertedId,
                        }, {}, s, f);
                    } else {
                        f();
                    }
                } else {
                    throw (error);
                }
            });
        });
    }

    /**
     * exposed update item in collection
     */
    updateOne = (tableName: string, data: object, s: (...args: any[]) => void) => {
        // this._getCollection(tableName, (collection: Collection) => {
        //     collection.update(data, (error, result) => {
        //         if (!error) {
        //             s(result);
        //         } else {
        //             throw (error);
        //         }
        //     });
        // });
    }

    /**
     * find one in data base
     */
    findOne = (tableName: string, query: any | {}, options: FindOneOptions, s: (...args: any[]) => void, f: (...args: any[]) => void) => {
        for (let key in query) {
            if (key === '_id') {
                query[key] = new ObjectId(query[key]);
                break;
            }
        }
        this._getCollection(tableName, (collection: Collection) => {
            collection.findOne(query, options || {}, (error, response) => {
                if (!error) {
                    s(response);
                } else {
                    f();
                }
            })
        });
    }

    /**
     * delete a record with record id
     */
    deleteRecord = (tableName: string, query: any, options?: object, s?: (...args: any[]) => void, f?: (...args: any[]) => void) => {
        for (let key in query) {
            if (key === '_id') {
                query[key] = new ObjectId(query[key]);
                break;
            }
        }
        this.getCollection(tableName, (collection: Collection) => {
            collection.findOneAndDelete(query, options || {}, (response) => {
                s && s(response);
            });
        })
    }

    /**
     * services thats need to be run on server initialization which will be invoked by mongo worker
     */
    init = () => {
        this._connectMongo(() => {
            this._connectDatabase((database: Db) => {
                console.log('Mongo service started.');
            });
        });
    }

}
