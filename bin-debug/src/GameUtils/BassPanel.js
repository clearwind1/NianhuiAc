/**
 * 基础面板类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    var BassPanel = (function (_super) {
        __extends(BassPanel, _super);
        function BassPanel() {
            _super.call(this);
            this.mStageW = egret.MainContext.instance.stage.stageWidth;
            this.mStageH = egret.MainContext.instance.stage.stageHeight;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = BassPanel.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.init();
        };
        __egretProto__.init = function () {
        };
        return BassPanel;
    })(egret.DisplayObjectContainer);
    GameUtil.BassPanel = BassPanel;
    BassPanel.prototype.__class__ = "GameUtil.BassPanel";
    /*
     *场景类
     */
    var GameScene = (function () {
        function GameScene() {
        }
        var __egretProto__ = GameScene.prototype;
        /**
         * 初始化场景类
         * @param stage
         */
        GameScene.init = function (stage) {
            this.MainStage = stage;
        };
        GameScene.getStage = function () {
            return this.MainStage;
        };
        /**
         * 切换场景
         * @param scene {egret.DisplayObjectContainer} 所要切换到的场景
         * @param transtype {number} 切换场景时的动画类型
         * @param duration {number} 切换场景的时间
         */
        GameScene.runscene = function (scene, transtype, duration) {
            if (transtype === void 0) { transtype = GameUtil.GameConfig.NullAction; }
            if (duration === void 0) { duration = 800; }
            if (this.curScene == null) {
                this.curScene = scene;
                this.MainStage.addChild(this.curScene);
                return;
            }
            if (transtype == GameUtil.GameConfig.NullAction) {
                if (this.curScene != null) {
                    this.MainStage.removeChild(this.curScene);
                }
                this.curScene = scene;
                this.MainStage.addChild(this.curScene);
                return;
            }
            else {
                this.nextScene = scene;
                this.MainStage.addChild(this.nextScene);
                //场景动画
                if (transtype == GameUtil.GameConfig.TransAlpha) {
                    this.nextScene.alpha = 0;
                    egret.Tween.get(this.curScene).to({ alpha: 0 }, duration);
                    egret.Tween.get(this.nextScene).to({ alpha: 1 }, duration);
                }
                if (transtype == GameUtil.GameConfig.CrossLeft) {
                    this.nextScene.x = -this.MainStage.stageWidth;
                    egret.Tween.get(this.curScene).to({ x: this.MainStage.stageWidth }, duration);
                    egret.Tween.get(this.nextScene).to({ x: 0 }, duration);
                }
                var local = this;
                egret.setTimeout(function () {
                    local.MainStage.removeChild(local.curScene);
                    local.curScene = local.nextScene;
                }, this, duration);
            }
        };
        GameScene.curScene = null;
        GameScene.nextScene = null;
        GameScene.MainStage = null;
        return GameScene;
    })();
    GameUtil.GameScene = GameScene;
    GameScene.prototype.__class__ = "GameUtil.GameScene";
})(GameUtil || (GameUtil = {}));
