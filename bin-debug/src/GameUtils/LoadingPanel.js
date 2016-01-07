/**
 * Created by pior on 15/9/29.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 加载进度界面
     * Process interface loading
     */
    var LoadingPanel = (function (_super) {
        __extends(LoadingPanel, _super);
        function LoadingPanel(fun, obj, url) {
            if (url === void 0) { url = "loadingbar.png"; }
            this.loadedfun = fun;
            this.thisObj = obj;
            this.imageUrl = "/resource/assets/" + url;
            _super.call(this);
        }
        var __egretProto__ = LoadingPanel.prototype;
        __egretProto__.init = function () {
            RES.getResByUrl(this.imageUrl, this.onComplete, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.onComplete = function (event) {
            this.y = this.mStageH - 200;
            var img = event;
            this.loadingbar = new egret.Bitmap(img);
            this.loadingbar.anchorX = 0;
            var w = this.loadingbar.texture.textureWidth - 8;
            var h = this.loadingbar.texture.textureHeight - 8;
            var rect = new egret.Rectangle(4, 4, w, h);
            this.loadingbar.scale9Grid = rect;
            this.addChild(this.loadingbar);
            this.loadingbar.width = 10;
            //console.log("thiswidth=======",this.width);
            //egret.MainContext.instance.stage.addChild(this);
            this.loadingRes();
        };
        __egretProto__.loadingRes = function () {
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
        };
        /**
         * 配置文件加载完成,开始预加载preload资源组。
         * configuration file loading is completed, start to pre-load the preload resource group
         */
        __egretProto__.onConfigComplete = function (event) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload");
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        __egretProto__.onResourceLoadComplete = function (event) {
            if (event.groupName == "preload") {
                this.stage.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                if (GameUtil.GameConfig.bRunFPS)
                    egret.Profiler.getInstance().run();
                this.loadedfun.apply(this.thisObj);
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        __egretProto__.onResourceLoadError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        __egretProto__.onResourceProgress = function (event) {
            if (event.groupName == "preload") {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
                this.setPro(event.itemsLoaded / event.itemsTotal);
            }
        };
        __egretProto__.setPro = function (persend) {
            this.loadingbar.width = this.loadingbar.texture.textureWidth * persend;
            //console.log("this.width=====",this.width);
        };
        __egretProto__.getPro = function () {
            return this.loadingbar.width / this.loadingbar.texture.textureWidth;
        };
        return LoadingPanel;
    })(GameUtil.BassPanel);
    GameUtil.LoadingPanel = LoadingPanel;
    LoadingPanel.prototype.__class__ = "GameUtil.LoadingPanel";
})(GameUtil || (GameUtil = {}));
