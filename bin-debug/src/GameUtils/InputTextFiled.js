/**
 * Created by pior on 15/12/30.
 */
var GameUtil;
(function (GameUtil) {
    var InputTextFiled = (function (_super) {
        __extends(InputTextFiled, _super);
        function InputTextFiled() {
            _super.call(this);
            this.init();
            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }
        var __egretProto__ = InputTextFiled.prototype;
        __egretProto__.init = function () {
            this.baseText = "";
        };
        __egretProto__.setBaseText = function (basetext, alpha) {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.text = this.baseText;
            this.alpha = this.baseTextAlpha;
        };
        __egretProto__.setBaseTextSize = function (size, sourcesize) {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            this.size = this.basetextsize;
        };
        __egretProto__.onFocusIn = function (event) {
            //console.log("focusein");
            if (this.text == this.baseText) {
                this.text = "";
                this.size = this.sourcesize;
                this.alpha = 1;
            }
        };
        __egretProto__.onFocusOut = function (event) {
            //console.log("focuseout");
            if (this.text == "") {
                this.text = this.baseText;
                this.alpha = this.baseTextAlpha;
                this.size = this.basetextsize;
            }
        };
        return InputTextFiled;
    })(egret.TextField);
    GameUtil.InputTextFiled = InputTextFiled;
    InputTextFiled.prototype.__class__ = "GameUtil.InputTextFiled";
})(GameUtil || (GameUtil = {}));
