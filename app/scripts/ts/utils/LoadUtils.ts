/**
 * Created by kev on 15-10-26.
 */

export class LoadUtils {
    public static loadShaders(ids):Promise<string[]> {
        var promises = [];
        for (var i = 0; i < ids.length; i++) {
            promises.push(this.loadShader(ids[i]));
        }
        return Promise.all(promises);
    }

    public static loadShader(id):Promise<string> {
        return new Promise(function (resolve) {
            var src = id;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function (e) {
                resolve((<XMLHttpRequest>e.currentTarget).responseText);
            });
            xhr.open('GET', src);
            xhr.send();
        });
    }

    static LoadImagesBySrc(arr):Promise<any> {
        var promises = [];
        for (var i = 0; i < arr.length; i++) {
            promises.push(this.LoadImageBySrc(arr[i]));
        }
        return Promise.all(promises);
    }

    static LoadImageBySrc(src):Promise<any> {

        return new Promise(function (resolve, reject) {
            var img = new Image();
            if (img.naturalWidth) {
                resolve(img);
            } else {
                img.onload = function () {
                    img.onload = null;
                    resolve(img);
                };
                img.src = src;
            }
        });
    }

    static LoadImages(arr):Promise<any> {
        var promises = [];
        for (var i = 0; i < arr.length; i++) {
            promises.push(this.LoadImage(arr[i]));
        }
        return Promise.all(promises);
    }

    static LoadImage(img):Promise<any> {
        return new Promise(function (resolve, reject) {
            if (img.naturalWidth) {
                resolve(img);
            } else {
                img.onload = function () {
                    img.onload = null;
                    resolve(img);
                };
            }
        });
    }

    static LoadIFrame(el:HTMLElement):Promise<any> {
        return new Promise((resolve, reject) => {
            el.onload = function () {
                resolve();
            };
        });
    }

    static LoadIFrames(els:HTMLElement[]):Promise<any> {
        var promises = els.map(el => {
            return LoadUtils.LoadIFrame(el);
        });
        return Promise.all(promises);
    }

    static LoadElements(el:HTMLElement[]):Promise<any> {
        var img = [];
        var iframes = [];

        el.forEach((el) => {
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
        return Promise.all(promises)
    }


    static CheckLoadable(el:HTMLElement):boolean {
        switch (el.nodeName) {
            case "iframe":
            case "IFRAME":
            case "img":
            case "IMG":
                return true;
            default:
                return false;
        }
    }

}
