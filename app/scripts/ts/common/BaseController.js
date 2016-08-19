define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by kev on 16-01-06.
     */
    var BaseController = (function () {
        function BaseController() {
            this.eventQueue = [];
            this.eventHandlers = {};
        }
        BaseController.prototype.dispatch = function (event) {
            var _this = this;
            setTimeout(function () {
                _this.eventQueue.push(event);
            }, 1);
        };
        BaseController.prototype.digestEventQueue = function () {
            try {
                var _this = this;
                this.eventQueue.forEach(function (event) {
                    if (_this.eventHandlers[event.eventType]) {
                        _this.eventHandlers[event.eventType].forEach(function (handler) {
                            handler.call(_this, event); //(event);
                        });
                    }
                });
            }
            catch (e) {
                console.error(e);
                console.log(e.stack);
            }
            this.eventQueue = [];
        };
        BaseController.prototype.listenTo = function (type, handler) {
            if (!this.eventHandlers[type]) {
                this.eventHandlers[type] = [];
            }
            this.eventHandlers[type].push(handler);
        };
        BaseController.prototype.update = function () {
            this.digestEventQueue();
        };
        return BaseController;
    }());
    return BaseController;
});
//# sourceMappingURL=BaseController.js.map