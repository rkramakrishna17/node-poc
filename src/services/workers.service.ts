import { UserWorker } from "../controllers/user/user.worker";
import { MongoWorker } from "../data/mongocontroller/mongo.worker";
import { SessionWorker } from "../controllers/session/session.worker";

export class WorkersService {

    /**
     * gathering all the workers
     */
    private _userWorker = new UserWorker();
    private _mongoWorker = new MongoWorker();
    private _sessionWorker = new SessionWorker();

    init = () => {
        /**
         * starting all the workers
         */
        this._mongoWorker.init();
        setTimeout(() => {
            this._userWorker.init();
            this._sessionWorker.init();
        }, 1000);
    }

}
