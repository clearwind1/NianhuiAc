/**
 * 菜单，按钮类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    /*
     *创建按钮
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * 创建菜单按钮类
         * @param context {any} 按钮所在stage
         * @param normal {string} 按钮普通状态下的图片文件名
         * @param select {string} 按钮选中状态下的图片文件名
         * @param backFun {Function} 按钮绑定的事件函数
         * @param param {any[]} 按钮绑定的事件函数的参数
         */
        function Menu(context, normal, select, backFun, param) {
            if (backFun === void 0) { backFun = null; }
            if (param === void 0) { param = null; }
            _super.call(this);
            this.menuNormalTexture = null;
            this.menuSelectTexture = null;
            this.bScaleMode = false;
            this.mScale = 0.9;
            this.isActive = false;
            this.thisObj = context;
            this.param = param;
            this.init(normal, select, backFun);
        }
        var __egretProto__ = Menu.prototype;
        __egretProto__.init = function (normal, select, backFun) {
            if (backFun === void 0) { backFun = null; }
            this.anchorX = this.anchorY = 0.5;
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new egret.Bitmap();
            this.btnImg.texture = this.menuNormalTexture;
            this.addChild(this.btnImg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchCancel, this);
        };
        __egretProto__.setBackFun = function (backFun) {
            this.backFun = backFun;
        };
        /**
         * 设置按钮的缩放模式，按钮状态只做缩放时可使用
         * @param scale {number} 缩放大小
         */
        __egretProto__.setScaleMode = function (scale) {
            if (scale === void 0) { scale = 0.9; }
            this.bScaleMode = true;
            this.mScale = scale;
        };
        /**
         * 设置按钮图片
         * @param normal
         * @param select
         */
        __egretProto__.setButtonTexture = function (normal, select) {
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.btnImg.texture = this.menuNormalTexture;
        };
        __egretProto__.addButtonImg = function (img, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            this.addImg = GameUtil.createBitmapByName(img);
            this.addImg.x = this.btnImg.texture.textureWidth / 2 + offx;
            this.addImg.y = this.btnImg.texture.textureHeight / 2 + offy;
            this.addChild(this.addImg);
        };
        __egretProto__.setAddImgTexture = function (img) {
            this.addImg.texture = RES.getRes(img);
        };
        __egretProto__.addButtonText = function (text, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            if (this.btnImg.texture != null) {
                this.mTextField = GameUtil.createTextField(this.btnImg.texture.textureWidth / 2 + offx, this.btnImg.texture.textureHeight / 2 + offy, 20);
            }
            else {
                this.mTextField = GameUtil.createTextField(offx, offy, 20);
            }
            this.mTextField.text = text;
            this.addChild(this.mTextField);
        };
        __egretProto__.getBtnText = function () {
            return this.mTextField;
        };
        __egretProto__.setBtnScale = function (scaleX, scaleY) {
            this.btnImg.scaleX = scaleX;
            this.btnImg.scaleY = scaleY;
        };
        __egretProto__.TouchBegin = function (event) {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = this.mScale;
            }
            this.isActive = true;
        };
        __egretProto__.TouchMove = function (event) {
            //console.log("touchmove");
        };
        __egretProto__.TouchEnd = function (event) {
            //console.log("touchend");
            this.btnImg.texture = this.menuNormalTexture;
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = 1;
            }
            if (this.isActive) {
                this.backFun.apply(this.thisObj, this.param);
            }
            this.isActive = false;
        };
        __egretProto__.TouchCancel = function (event) {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = 1;
            }
            this.isActive = false;
        };
        return Menu;
    })(egret.DisplayObjectContainer);
    GameUtil.Menu = Menu;
    Menu.prototype.__class__ = "GameUtil.Menu";
})(GameUtil || (GameUtil = {}));
