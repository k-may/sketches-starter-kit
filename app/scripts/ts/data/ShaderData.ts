/**
 * Created by kevin.mayo on 18/08/16.
 */
/**
 * Created by kev on 15-09-30.
 */
import THREE = require("three");
import Shader = THREE.Shader;
import _ = require("underscore");

import * as TI from "./ThreeInterfaces";
import {LoadUtils} from "../utils/LoadUtils";

export class ShaderData {

    fragmentID:string;
    vertexID:string;

    uniforms:any;

    scene:THREE.Scene;
    camera:THREE.Camera;
    mesh:THREE.Mesh;
    material:THREE.ShaderMaterial;

    fragmentShader:string = "";
    vertexShader:string = "";

    ready:boolean = false;

    width:number = 0;
    height:number = 0;
    time:number = 0;

    constructor(fragmentID:string, vertexID?:string, uniforms?:any) {

        this.fragmentID = fragmentID;
        this.vertexID = vertexID;

        uniforms = uniforms || {};

        this.uniforms = _.extend(uniforms ,{
            time: new TI.UniformF(),
            resolution: new TI.UniformV2(),
            mouse: new TI.UniformV2()
        });
    }

    start():Promise<void>{

        var self = this;
        var vertexPath = "glsl/" + self.vertexID + ".glsl";
        var fragmentPath = "glsl/" + self.fragmentID + ".glsl";

        return LoadUtils.loadShaders([vertexPath, fragmentPath]).then(function(shaders){
            self.vertexShader = shaders[0];
            self.fragmentShader = shaders[1];
            self.createMaterial();
        }).catch(function(e){
            console.log(e.stack);
        });

    }

    createMaterial():void {

        this.camera = new THREE.Camera();
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        this.material = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });
        this.material.needsUpdate = true;

        if (!this.mesh) {
            var geometry:THREE.PlaneGeometry = new THREE.PlaneGeometry(2, 2);
            //geometry.//dynamic = true;
            this.mesh = new THREE.Mesh(geometry);
        }

        this.mesh.material = this.material;
        this.scene.add(this.mesh);

        this.ready = true;
    }


    update(time:number, w:number, h:number, mx?:number, my?:number):void {
        // console.log(this.time);
        this.uniforms.time.value = this.time += 0.05;
        this.uniforms.resolution.value.x = w;
        this.uniforms.resolution.value.y = h;

        if (mx && my) {
            this.uniforms.mouse.value.x = mx / w;
            this.uniforms.mouse.value.y = my / h;
        }

    }

    render(renderer:THREE.Renderer):void {
        renderer.render(this.scene, this.camera);
    }

}
