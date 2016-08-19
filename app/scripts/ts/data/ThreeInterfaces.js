/**
 * Created by kevin.mayo on 18/08/16.
 */
define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    var UniformF = (function () {
        function UniformF() {
            this.value = 1.0;
            this.type = 'f';
        }
        return UniformF;
    }());
    exports.UniformF = UniformF;
    var UniformT = (function () {
        function UniformT(value) {
            this.type = 't';
            this.value = value;
        }
        return UniformT;
    }());
    exports.UniformT = UniformT;
    var UniformV2 = (function () {
        function UniformV2() {
            this.value = new THREE.Vector2();
            this.type = "v2";
        }
        return UniformV2;
    }());
    exports.UniformV2 = UniformV2;
});
//# sourceMappingURL=ThreeInterfaces.js.map