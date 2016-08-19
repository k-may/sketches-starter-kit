/**
 * Created by kev on 16-04-18.
 */
"use strict"

import IEvent = require('ts/events/IEvent');

export interface  EventHandler {
    (event:IEvent) : void;
}
