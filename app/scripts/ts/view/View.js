define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View(el) {
            this.numChildren = 0;
            this.views = [];
            this.el = el || document.createElement("div");
            this.$el = $(this.el);
            this.x = 0;
            this.y = 0;
        }
        View.prototype.setPos = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        View.prototype.onResize = function (width, height) {
            this.width = width;
            this.height = height;
        };
        View.prototype.addChild = function (view) {
            if (this.views.indexOf(view) === -1) {
                this.views.push(view);
                this.el.appendChild(view.el);
                this.numChildren = this.views.length;
            }
        };
        View.prototype.removeChild = function (view) {
            if (this.views.indexOf(view) !== -1) {
                this.views.splice(this.views.indexOf(view), 1);
                this.numChildren = this.views.length;
            }
            view.$el.remove();
        };
        View.prototype.draw = function (time) {
            for (var i = 0; i < this.numChildren; i++) {
                this.views[i].draw(time);
            }
        };
        View.prototype.show = function () {
            this.el.style.display = "block";
        };
        View.prototype.hide = function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                resolve(self);
            });
        };
        View.prototype.invalidate = function () {
            this.invalidated = true;
        };
        View.prototype.destroy = function () {
            this.$el.remove();
        };
        View.PADDING_LEFT = 34;
        View.PADDING_TOP = 100;
        View.PADDING_RIGHT = 34;
        return View;
    }());
    exports.View = View;
});
//# sourceMappingURL=View.js.map