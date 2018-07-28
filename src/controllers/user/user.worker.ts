import { Collection } from 'mongodb';

import { MongoService } from '../../data/mongocontroller/mongo.service';

export class UserWorker {

    /**
     * initializing dependencies
     */
    private _mongoService = new MongoService();

    private collectionName = 'user';

    private _checkIfCollectionExists = () => {
        this._mongoService.getCollection(this.collectionName, (result: Collection) => {
            if (!result) {
                this._mongoService.createCollection(this.collectionName, (collection: Collection) => {
                    console.log('Created user collection successfully');
                }, {
                        autoIndexId: true,
                    }
                );
            } else {
                console.log('User collection exists');
            }
        })
    }

    init = () => {
        this._checkIfCollectionExists();
    }

}
