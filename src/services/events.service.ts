import { EventEmitter } from "events";

let event = new EventEmitter();

export class Events extends EventEmitter {

    static event = event;

}
