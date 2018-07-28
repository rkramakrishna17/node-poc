/**
 * importing dependencies
 */
import { MongoService } from "./mongo.service";

export class MongoWorker {

    /**
     * initializing dependencies
     */
    private _mongo = new MongoService;

    /**
     * starting the mongo TCP connection
     */
    private startMongoService = () => {
        this._mongo.init();
    }

    /**
     * needs to be run on server start on master cluster
     */
    init = () => {
        this.startMongoService();
    }

}
