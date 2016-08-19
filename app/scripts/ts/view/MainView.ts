import {View} from "./View";
import ShaderView = require("./ShaderView");
/**
 * Created by kevin.mayo on 18/08/16.
 */
///<reference path="../../../../typings/index.d.ts"/>

export class MainView extends View {

  _bgView: ShaderView;

  constructor() {
    super(document.body);

    this._bgView = new ShaderView("bg_fragment", "default_vertex");
    this.addChild(this._bgView);


    var self = this;
    window.onresize = function () {
      self.onResize(window.innerWidth, window.innerHeight);
    };
    $(window).trigger("resize");
  }


  onResize(width?: number, height?: number): void {
    super.onResize(width, height);

    this._bgView.onResize(this.width, this.height);
  }
}

