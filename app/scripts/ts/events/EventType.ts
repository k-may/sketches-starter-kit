/**
 * Created by kev on 16-04-18.
 */

export class EventType {
    static READY:string = "ready";
    static ENTRY_TOUCH:string = "entryStart";
    static ENTRY_SCALE:string = "entryScale";
    static ENTRY_RELEASE:string = "entryRelease";
    static PAGE_CHANGE:string = "pageChange";
    static ENTRY_CHANGE:string = "entryChange";
    static ROUTE:string = "route";
    static SHOW_ENTRY:string = "showEntry";
    static SHOW_HOME:string = "showHome";
    static SHOW_PREVIOUS:string = "showPrevious";
    static SHOW_NEXT:string = "showNext";
    static SCROLL:string = "scroll";
    static EXPAND_SCROLL:string = "expandScroll";
    static HOVER_TAB:string = "hoverTab";

    name:string;

    constructor(name:string) {
        this.name = name;
    }
}
