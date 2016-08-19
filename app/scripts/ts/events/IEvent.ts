/**
 * Created by kev on 16-04-18.
 */

interface IEvent {
    eventType : string;
    dispatch();
}

export = IEvent;