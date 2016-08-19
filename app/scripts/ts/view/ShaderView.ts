import {ShaderData} from "../data/ShaderData";
import {View} from "./View";
/**
 * Created by kevin.mayo on 18/08/16.
 */

class ShaderView extends View {

    canvas:HTMLCanvasElement;
    shaderData:ShaderData;
    loaded:boolean = false;
    renderer:THREE.Renderer;
    fragmentID:string;
    vertexID:string;

    constructor(fragment?:string, vertex?:string, uniforms?:any) {
        super();

        this.fragmentID = fragment || "marilyn";
        this.vertexID = vertex || "vertex";

        this.renderer = new THREE.WebGLRenderer();

        this.canvas = this.renderer.domElement;
        this.el.setAttribute("class", "shader__cont");
        this.el.appendChild(this.canvas);

        this.shaderData = new ShaderData(this.fragmentID, this.vertexID, uniforms);
        var self = this;
        this.shaderData.start().then(function () {
            self.loaded = true;
            self.onResize(self.width, self.height);
        }).catch(function (e) {
            console.log(e.stack);
        });

    }

    onResize(width:number, height:number):void {
        super.onResize(width, height);
        this.renderer.setSize(width, height);
    }

    draw(time:number):void {
        super.draw(time);

        if (!this.loaded) {
            return;
        }

        this.shaderData.update(time, this.width, this.height);
        this.shaderData.render(this.renderer);
    }
}

export = ShaderView;