/**
 * 获取网络图片
 * Created by pior on 15/11/13.
 */
var GameUtil;
(function (GameUtil) {
    var GetImageByUrl = (function (_super) {
        __extends(GetImageByUrl, _super);
        function GetImageByUrl(url, imgwidth, imgheight) {
            if (imgwidth === void 0) { imgwidth = 0; }
            if (imgheight === void 0) { imgheight = 0; }
            _super.call(this);
            this.imgUrl = url;
            this.imgwidth = imgwidth;
            this.imgheight = imgheight;
            this.init();
        }
        var __egretProto__ = GetImageByUrl.prototype;
        __egretProto__.init = function () {
            RES.getResByUrl(this.imgUrl, this.comp, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.comp = function (data) {
            this.imag = new egret.Bitmap();
            this.imag.texture = data;
            this.imag.anchorX = this.imag.anchorY = 0.5;
            this.addChild(this.imag);
            if (this.imgwidth != 0) {
                this.imag.width = this.imgwidth;
            }
            if (this.imgheight != 0) {
                this.imag.height = this.imgheight;
            }
        };
        __egretProto__.getimg = function () {
            return this.imag;
        };
        return GetImageByUrl;
    })(egret.DisplayObjectContainer);
    GameUtil.GetImageByUrl = GetImageByUrl;
    GetImageByUrl.prototype.__class__ = "GameUtil.GetImageByUrl";
})(GameUtil || (GameUtil = {}));
