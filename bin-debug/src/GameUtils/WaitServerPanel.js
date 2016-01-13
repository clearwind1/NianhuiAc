/**
 * 等待响应
 * Created by pior on 15/11/11.
 */
var GameUtil;
(function (GameUtil) {
    var WaitServerPanel = (function (_super) {
        __extends(WaitServerPanel, _super);
        function WaitServerPanel(alpha) {
            if (alpha === void 0) { alpha = 0; }
            _super.call(this);
            this.init(alpha);
        }
        var __egretProto__ = WaitServerPanel.prototype;
        __egretProto__.init = function (alpha) {
            this.coverBg = GameUtil.createRect(0, 0, 640, 1136, 0);
            this.addChild(this.coverBg);
            this.touchEnabled = true;
        };
        __egretProto__.setAlpha = function (aplha) {
            this.coverBg.alpha = aplha;
        };
        WaitServerPanel.getInstace = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel(0);
            }
            return this._instance;
        };
        return WaitServerPanel;
    })(egret.DisplayObjectContainer);
    GameUtil.WaitServerPanel = WaitServerPanel;
    WaitServerPanel.prototype.__class__ = "GameUtil.WaitServerPanel";
})(GameUtil || (GameUtil = {}));
