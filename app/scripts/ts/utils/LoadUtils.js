/**
 * Created by kev on 15-10-26.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var LoadUtils = (function () {
        function LoadUtils() {
        }
        LoadUtils.loadShaders = function (ids) {
            var promises = [];
            for (var i = 0; i < ids.length; i++) {
                promises.push(this.loadShader(ids[i]));
            }
            return Promise.all(promises);
        };
        LoadUtils.loadShader = function (id) {
            return new Promise(function (resolve) {
                var src = id;
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('load', function (e) {
                    resolve(e.currentTarget.responseText);
                });
                xhr.open('GET', src);
                xhr.send();
            });
        };
        LoadUtils.LoadImagesBySrc = function (arr) {
            var promises = [];
            for (var i = 0; i < arr.length; i++) {
                promises.push(this.LoadImageBySrc(arr[i]));
            }
            return Promise.all(promises);
        };
        LoadUtils.LoadImageBySrc = function (src) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                if (img.naturalWidth) {
                    resolve(img);
                }
                else {
                    img.onload = function () {
                        img.onload = null;
                        resolve(img);
                    };
                    img.src = src;
                }
            });
        };
        LoadUtils.LoadImages = function (arr) {
            var promises = [];
            for (var i = 0; i < arr.length; i++) {
                promises.push(this.LoadImage(arr[i]));
            }
            return Promise.all(promises);
        };
        LoadUtils.LoadImage = function (img) {
            return new Promise(function (resolve, reject) {
                if (img.naturalWidth) {
                    resolve(img);
                }
                else {
                    img.onload = function () {
                        img.onload = null;
                        resolve(img);
                    };
                }
            });
        };
        LoadUtils.LoadIFrame = function (el) {
            return new Promise(function (resolve, reject) {
                el.onload = function () {
                    resolve();
                };
            });
        };
        LoadUtils.LoadIFrames = function (els) {
            var promises = els.map(function (el) {
                return LoadUtils.LoadIFrame(el);
            });
            return Promise.all(promises);
        };
        LoadUtils.LoadElements = function (el) {
            var img = [];
            var iframes = [];
            el.forEach(function (el) {
                switch (el.nodeName) {
                    case "iframe":
                    case "IFRAME":
                        iframes.push(el);
                        break;
                    case "img":
                    case "IMG":
                        img.push(el);
                        break;
                }
            });
            var promises = [];
            promises.push(LoadUtils.LoadImages(img));
            promises.push(LoadUtils.LoadIFrames(iframes));
            return Promise.all(promises);
        };
        LoadUtils.CheckLoadable = function (el) {
            switch (el.nodeName) {
                case "iframe":
                case "IFRAME":
                case "img":
                case "IMG":
                    return true;
                default:
                    return false;
            }
        };
        return LoadUtils;
    }());
    exports.LoadUtils = LoadUtils;
});
//# sourceMappingURL=LoadUtils.js.map