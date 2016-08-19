var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./View", "./ShaderView"], function (require, exports, View_1, ShaderView) {
    "use strict";
    /**
     * Created by kevin.mayo on 18/08/16.
     */
    ///<reference path="../../../../typings/index.d.ts"/>
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            _super.call(this, document.body);
            this._bgView = new ShaderView("bg_fragment", "default_vertex");
            this.addChild(this._bgView);
            var self = this;
            window.onresize = function () {
                self.onResize(window.innerWidth, window.innerHeight);
            };
            $(window).trigger("resize");
        }
        MainView.prototype.onResize = function (width, height) {
            _super.prototype.onResize.call(this, width, height);
            this._bgView.onResize(this.width, this.height);
        };
        return MainView;
    }(View_1.View));
    exports.MainView = MainView;
});
//# sourceMappingURL=MainView.js.map