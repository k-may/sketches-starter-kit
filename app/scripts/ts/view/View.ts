import {IView} from "./common/IView";
export class View {

    width:number;
    height:number;

    static PADDING_LEFT:number = 34;
    static PADDING_TOP:number = 100;
    static PADDING_RIGHT:number = 34;

    x:number;
    y:number;
    z:number;

    numChildren : number = 0;

    el:HTMLElement;
    $el:any;
    public parent:IView;
    views:IView[] = [];

    invalidated:boolean;

    setPos(x:number, y:number, z?:number):void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    onResize(width?:number, height?:number):void {
        this.width = width;
        this.height = height;
    }


    addChild(view:IView):void {
        if (this.views.indexOf(view) === -1) {
            this.views.push(view);
            this.el.appendChild((<View>view).el);
            this.numChildren = this.views.length;
        }
    }

    removeChild(view:IView):void {
        if (this.views.indexOf(view) !== -1) {
            this.views.splice(this.views.indexOf(view), 1);
            this.numChildren = this.views.length;
        }
        (<View>view).$el.remove();
    }

    draw(time:number):void {
        for(var i=  0 ;i < this.numChildren; i ++){
            this.views[i].draw(time);
        }
    }

    show():void {
        this.el.style.display = "block";
    }

    hide():Promise<View> {
        var self:View = this;
        return new Promise(function (resolve, reject) {
            resolve(self);
        });
    }

    invalidate():void {
        this.invalidated = true;
    }

    destroy():void {
        this.$el.remove();
    }

    constructor(el?:HTMLElement) {
        this.el = el || document.createElement("div");
        this.$el = $(this.el);

        this.x = 0;
        this.y = 0;
    }
}
