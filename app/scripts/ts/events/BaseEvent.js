/**
 * Created by kev on 16-04-18.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var BaseEvent = (function () {
        //controller: Controller;
        function BaseEvent(eventType) {
            this.eventType = eventType;
        }
        BaseEvent.prototype.dispatch = function () {
            Controller.getInstance().dispatch(this);
        };
        return BaseEvent;
    }());
    exports.BaseEvent = BaseEvent;
});
//# sourceMappingURL=BaseEvent.js.map