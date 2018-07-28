import { Collection } from 'mongodb';

import { MongoService } from '../../data/mongocontroller/mongo.service';
import { Events } from './../../services/events.service';
import { Session } from './session.model';
import { SessionService } from './session.service';

export class SessionWorker {

    /**
     * initializing dependencies
     */
    private _mongoService = new MongoService();
    private _eventEmitter = Events.event;
    private _sessionService = new SessionService();

    private collectionName = 'session';

    private _checkIfCollectionExists = () => {
        this._mongoService.getCollection(this.collectionName, (result: Collection) => {
            if (!result) {
                this._mongoService.createCollection(this.collectionName, (collection: Collection) => {
                    console.log('Created session collection successfully');
                }, {
                        autoIndexId: true,
                    }
                );
            } else {
                console.log('session collection exists');
            }
        })
    }

    init = () => {
        this._checkIfCollectionExists();

        /**
         * listen to session record
         */
        this._eventEmitter.on('deleteSessionRecord', (sessionObject: Session) => {
            this._sessionService.deleteSessionObject(sessionObject);
        })
    }

}
