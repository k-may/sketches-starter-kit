/**
 * Created by kev on 16-04-18.
 */

//import Controller = require('ts/controller');
declare var Controller;
import IEvent = require('IEvent');

export class BaseEvent{
    public eventType:string;

    //controller: Controller;

    constructor(eventType:string) {
        this.eventType = eventType;

    }

    dispatch():void {
        Controller.getInstance().dispatch(this);
    }
}
