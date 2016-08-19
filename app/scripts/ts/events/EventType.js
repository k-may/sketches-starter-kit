/**
 * Created by kev on 16-04-18.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var EventType = (function () {
        function EventType(name) {
            this.name = name;
        }
        EventType.READY = "ready";
        EventType.ENTRY_TOUCH = "entryStart";
        EventType.ENTRY_SCALE = "entryScale";
        EventType.ENTRY_RELEASE = "entryRelease";
        EventType.PAGE_CHANGE = "pageChange";
        EventType.ENTRY_CHANGE = "entryChange";
        EventType.ROUTE = "route";
        EventType.SHOW_ENTRY = "showEntry";
        EventType.SHOW_HOME = "showHome";
        EventType.SHOW_PREVIOUS = "showPrevious";
        EventType.SHOW_NEXT = "showNext";
        EventType.SCROLL = "scroll";
        EventType.EXPAND_SCROLL = "expandScroll";
        EventType.HOVER_TAB = "hoverTab";
        return EventType;
    }());
    exports.EventType = EventType;
});
//# sourceMappingURL=EventType.js.map