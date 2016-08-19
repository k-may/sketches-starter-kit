define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by kev on 15-09-30.
     */
    var $M = window.hasOwnProperty("$M") ? window["$M"] : {};
    var AnimUtils = (function () {
        function AnimUtils() {
        }
        AnimUtils.SetPosition = function (el, pos) {
            if (!el) {
                return;
            }
            var cssTransformMatrix;
            if (AnimUtils.TRANSFORM_3D) {
                pos.z = pos.z || 0;
                var translationM = this.GetTranslationMatrix(pos.x, pos.y, pos.z);
                cssTransformMatrix = this.GetStringTransform3d(translationM);
            }
            else {
                cssTransformMatrix = this.GetStringTranslate2d(pos.x, pos.y);
            }
            el.style[AnimUtils.TRANSFORM_PREFIX] = cssTransformMatrix;
        };
        AnimUtils.SetTransformMatrix = function (el, listMatrix) {
            var cssTransformMatrix;
            if (!Array.isArray(listMatrix)) {
                listMatrix = [listMatrix];
            }
            if (AnimUtils.TRANSFORM_3D) {
                var translationM = this.GetResultMatrix(listMatrix);
                cssTransformMatrix = this.GetStringTransform3d(translationM);
            }
            else {
            }
            el.style[AnimUtils.TRANSFORM_PREFIX] = cssTransformMatrix;
        };
        AnimUtils.SetMatrix = function (el, rx, ry, rz, s, tx, ty, tz) {
            var matrix = this.GetMatrix(rx, ry, rz, s, tx, ty, tz);
            el.style[this.TRANSFORM_PREFIX] = matrix;
        };
        AnimUtils.GetScaleMatrix = function (scaleX, scaleY, scaleZ) {
            var _scaleX = scaleX;
            var _scaleY = scaleY !== undefined ? scaleY : _scaleX;
            var _scaleZ = scaleZ !== undefined ? scaleZ : _scaleX;
            if (AnimUtils.TRANSFORM_3D) {
                return $M([[_scaleX, 0, 0, 0], [0, _scaleY, 0, 0], [0, 0, _scaleZ, 0], [0, 0, 0, 1]]);
            }
            else {
                //todo does this work?
                return $M([[_scaleX, 0, 0], [0, _scaleY, 0], [0, 0, 1]]);
            }
        };
        AnimUtils.GetRotationMatrix = function (rX, rY, rZ) {
            var deg2rad = Math.PI / 180; // Degrees to radians constant
            var rotationXMatrix, rotationYMatrix, rotationZMatrix;
            rotationXMatrix = $M([
                [1, 0, 0, 0],
                [0, Math.cos(rX * deg2rad), Math.sin(-rX * deg2rad), 0],
                [0, Math.sin(rX * deg2rad), Math.cos(rX * deg2rad), 0],
                [0, 0, 0, 1]]);
            rotationYMatrix = $M([
                [Math.cos(rY * deg2rad), 0, Math.sin(rY * deg2rad), 0],
                [0, 1, 0, 0],
                [Math.sin(-rY * deg2rad), 0, Math.cos(rY * deg2rad), 0],
                [0, 0, 0, 1]]);
            rotationZMatrix = $M([
                [Math.cos(rZ * deg2rad), Math.sin(-rZ * deg2rad), 0, 0],
                [Math.sin(rZ * deg2rad), Math.cos(rZ * deg2rad), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]]);
            return rotationXMatrix.x(rotationYMatrix).x(rotationZMatrix);
        };
        AnimUtils.GetStringResultMatrix = function (listMatrix) {
            var mat = this.GetResultMatrix(listMatrix);
            return this.GetStringTransform3d(mat);
        };
        AnimUtils.GetResultMatrix = function (listMatix) {
            if (listMatix.length === 1) {
                return listMatix[0];
            }
            else {
                var resultMatrix = $M([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
                for (var i = 0; i < listMatix.length; i++) {
                    var nextMatrix = listMatix[i];
                    resultMatrix = nextMatrix.x(resultMatrix);
                }
                return resultMatrix;
            }
        };
        AnimUtils.GetTranslationMatrix = function (translationX, translationY, translationZ) {
            var _translationX = translationX !== undefined ? translationX : 0;
            var _translationY = translationY !== undefined ? translationY : 0;
            var _translationZ = translationZ !== undefined ? translationZ : 0;
            return $M([
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [_translationX, _translationY, _translationZ, 1]
            ]);
        };
        AnimUtils.GetMatrix = function (rX, rY, rZ, scale, tX, tY, tZ) {
            var rotationMatrix, scaleMatrix, transformationMatrix, translationMatrix;
            scaleMatrix = AnimUtils.GetScaleMatrix(scale);
            rotationMatrix = AnimUtils.GetRotationMatrix(rX, rY, rZ);
            transformationMatrix = rotationMatrix.x(scaleMatrix);
            transformationMatrix = transformationMatrix.transpose();
            translationMatrix = $M([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [tX, tY, tZ, 1]]);
            transformationMatrix = transformationMatrix.x(translationMatrix); // Apply transformation matrix AFTER transposing rotation and scale
            return AnimUtils.GetStringTransform3d(transformationMatrix);
            /*var s = "matrix3d(";
             s += transformationMatrix.e(1, 1).toFixed(5) + "," + transformationMatrix.e(1, 2).toFixed(5) + "," + transformationMatrix.e(1, 3).toFixed(5) + "," + transformationMatrix.e(1, 4).toFixed(5) + ",";
             s += transformationMatrix.e(2, 1).toFixed(5) + "," + transformationMatrix.e(2, 2).toFixed(5) + "," + transformationMatrix.e(2, 3).toFixed(5) + "," + transformationMatrix.e(2, 4).toFixed(5) + ",";
             s += transformationMatrix.e(3, 1).toFixed(5) + "," + transformationMatrix.e(3, 2).toFixed(5) + "," + transformationMatrix.e(3, 3).toFixed(5) + "," + transformationMatrix.e(3, 4).toFixed(5) + ",";
             s += transformationMatrix.e(4, 1).toFixed(5) + "," + transformationMatrix.e(4, 2).toFixed(5) + "," + transformationMatrix.e(4, 3).toFixed(5) + "," + transformationMatrix.e(4, 4).toFixed(5);
             s += ")";
    
             return s;*/
        };
        AnimUtils.GetStringTransform3d = function (transformationMatrix) {
            var stringTransform = "matrix3d(";
            stringTransform += transformationMatrix.e(1, 1).toFixed(5) + "," + transformationMatrix.e(1, 2).toFixed(5) + "," + transformationMatrix.e(1, 3) + "," + transformationMatrix.e(1, 4).toFixed(5) + ",";
            stringTransform += transformationMatrix.e(2, 1).toFixed(5) + "," + transformationMatrix.e(2, 2).toFixed(5) + "," + transformationMatrix.e(2, 3) + "," + transformationMatrix.e(2, 4).toFixed(5) + ",";
            stringTransform += transformationMatrix.e(3, 1).toFixed(5) + "," + transformationMatrix.e(3, 2).toFixed(5) + "," + transformationMatrix.e(3, 3) + "," + transformationMatrix.e(3, 4).toFixed(5) + ",";
            stringTransform += transformationMatrix.e(4, 1).toFixed(5) + "," + transformationMatrix.e(4, 2).toFixed(5) + "," + transformationMatrix.e(4, 3) + "," + transformationMatrix.e(4, 4).toFixed(5);
            stringTransform += ")";
            return stringTransform;
        };
        AnimUtils.GetStringTranslate2d = function (x, y) {
            var stringTransform = "translate(";
            stringTransform += x + 'px,';
            stringTransform += y + 'px)';
            return stringTransform;
        };
        AnimUtils.TRANSFORM_PREFIX = Modernizr.prefixed('transform');
        AnimUtils.TRANSFORM_3D = Modernizr.csstransforms3d;
        return AnimUtils;
    }());
    exports.AnimUtils = AnimUtils;
});
//# sourceMappingURL=AnimUtils.js.map