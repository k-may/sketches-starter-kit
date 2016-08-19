var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../data/ShaderData", "./View"], function (require, exports, ShaderData_1, View_1) {
    "use strict";
    /**
     * Created by kevin.mayo on 18/08/16.
     */
    var ShaderView = (function (_super) {
        __extends(ShaderView, _super);
        function ShaderView(fragment, vertex, uniforms) {
            _super.call(this);
            this.loaded = false;
            this.fragmentID = fragment || "marilyn";
            this.vertexID = vertex || "vertex";
            this.renderer = new THREE.WebGLRenderer();
            this.canvas = this.renderer.domElement;
            this.el.setAttribute("class", "shader__cont");
            this.el.appendChild(this.canvas);
            this.shaderData = new ShaderData_1.ShaderData(this.fragmentID, this.vertexID, uniforms);
            var self = this;
            this.shaderData.start().then(function () {
                self.loaded = true;
                self.onResize(self.width, self.height);
            }).catch(function (e) {
                console.log(e.stack);
            });
        }
        ShaderView.prototype.onResize = function (width, height) {
            _super.prototype.onResize.call(this, width, height);
            this.renderer.setSize(width, height);
        };
        ShaderView.prototype.draw = function (time) {
            _super.prototype.draw.call(this, time);
            if (!this.loaded) {
                return;
            }
            this.shaderData.update(time, this.width, this.height);
            this.shaderData.render(this.renderer);
        };
        return ShaderView;
    }(View_1.View));
    return ShaderView;
});
//# sourceMappingURL=ShaderView.js.map