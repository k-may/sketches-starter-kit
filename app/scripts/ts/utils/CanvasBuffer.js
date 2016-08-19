/**
 * Created by kev on 16-02-12.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var CanvasBuffer = (function () {
        function CanvasBuffer() {
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
        }
        CanvasBuffer.prototype.resize = function (w, h) {
            if (w !== this.width || h !== this.height) {
                this.canvas.width = this.width = w;
                this.canvas.height = this.height = h;
            }
        };
        CanvasBuffer.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        //for debug!
        CanvasBuffer.prototype.fill = function (color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.width, this.height);
        };
        return CanvasBuffer;
    }());
    exports.CanvasBuffer = CanvasBuffer;
});
//# sourceMappingURL=CanvasBuffer.js.map