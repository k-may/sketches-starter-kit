/**
 * Created by kev on 16-04-18.
 */
export interface IView {
    draw(time:number):void;
    addChild(view:IView):void;
    removeChild(view:IView):void;
    onResize(width?:number, height?:number) : void;
    setPos(x:number, y:number, z ?:number) : void;
    show():void;
    hide():Promise<IView>;
    destroy():void;
}
