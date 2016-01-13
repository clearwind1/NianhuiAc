/**
 * Created by pior on 16/1/7.
 */
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        _super.call(this);
        this.SPoint = new egret.Point;
        this.maskrect = new egret.Rectangle(320, 0, 0, 1136);
        this.touchactive = false;
    }
    var __egretProto__ = LoginPage.prototype;
    __egretProto__.init = function () {
        //左右门
        this.doorContL = GameUtil.createBitmapByName("doorl_jpg");
        this.doorContL.x = 160;
        this.doorContL.y = this.mStageH / 2;
        this.addChild(this.doorContL);
        this.doorContR = GameUtil.createBitmapByName("doorr_jpg");
        this.doorContR.x = 480;
        this.doorContR.y = this.mStageH / 2;
        this.addChild(this.doorContR);
        this.dispCont = new egret.DisplayObjectContainer();
        this.addChild(this.dispCont);
        this.show();
    };
    __egretProto__.show = function () {
        var usertip = GameUtil.createTextField(this.mStageW / 2, this.mStageH / 2, 30);
        usertip.text = '请输入\n您的幸运工号';
        usertip.textColor = 0x000000;
        this.dispCont.addChild(usertip);
        console.log("dispCont=====", this.dispCont.width);
        var inputframe = GameUtil.createBitmapByName("inputframe_png");
        inputframe.x = this.mStageW / 2;
        inputframe.y = this.mStageH / 2 + 50;
        inputframe.scaleX = 1.5;
        this.dispCont.addChild(inputframe);
        this.userinput = GameUtil.createInputText(this.mStageW / 2, this.mStageH / 2 + 50, 25, 210, 30, 7);
        this.userinput.anchorX = this.userinput.anchorY = 0.5;
        this.userinput.textAlign = egret.HorizontalAlign.CENTER;
        this.userinput.textColor = 0x000000;
        this.userinput.setBaseTextSize(30, 30);
        this.userinput.text = '8872942';
        this.dispCont.addChild(this.userinput);
        //logo
        var logoimg = GameUtil.createBitmapByName("loadingbar_png");
        logoimg.x = this.mStageW / 2;
        logoimg.y = 160;
        this.dispCont.addChild(logoimg);
        var scrollbar = GameUtil.createBitmapByName("scrollBar_png");
        scrollbar.x = this.mStageW / 2;
        scrollbar.y = 868;
        this.dispCont.addChild(scrollbar);
        this.scrollball = GameUtil.createBitmapByName("scrollBall_png");
        this.scrollball.anchorX = 0;
        this.scrollball.x = 120;
        this.scrollball.y = 868;
        this.scrollball.scale9Grid = new egret.Rectangle(10, 10, 380, 80);
        this.scrollball.width = 100;
        this.dispCont.addChild(this.scrollball);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchsballbegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchsballmove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchsballend, this);
    };
    __egretProto__.touchsballbegin = function (e) {
        if (this.scrollball.hitTestPoint(e.stageX, e.stageY)) {
            this.SPoint.x = e.stageX;
            this.touchactive = true;
        }
    };
    __egretProto__.touchsballmove = function (e) {
        //console.log("touchmove");
        if (this.touchactive) {
            var px = 100 + e.stageX - this.SPoint.x;
            if (px >= 400) {
                px = 400;
            }
            if (px > 100) {
                this.scrollball.width = px;
            }
        }
    };
    __egretProto__.touchsballend = function (e) {
        //console.log("touchend======",this.scrollball.width);
        if (this.touchactive) {
            if (this.scrollball.width <= 280) {
                this.scrollball.width = 100;
            }
            else {
                this.scrollball.width = (this.scrollball.width > 400 ? this.scrollball.width : 400);
                this.checkUserID();
            }
        }
        this.touchactive = false;
    };
    __egretProto__.checkUserID = function () {
        var id = Number(this.userinput.text.substr(0, 3));
        var code = Number(this.userinput.text.substr(3));
        console.log("id====", id, "code======", code);
        var parm = {
            cardid: id,
            verifycode: code
        };
        GameUtil.Http.getinstance().send(parm, "/account/login", this.Login, this);
        //
        //
        //if(id != 1){
        //    var shap: egret.Shape = GameUtil.createCircle(this.mStageW/2,this.mStageH/2,100,0.8,0xff0000);
        //    this.addChild(shap);
        //
        //    var slef = this;
        //    var tag = egret.Tween.get(shap).to({alpha:0},500).call(function(){
        //        slef.removeChild(shap);
        //        egret.Tween.removeTweens(tag);
        //    })
        //
        //    this.scrollball.width = 100;
        //
        //}else
        //{
        //    this.Login(null);
        //}
    };
    __egretProto__.Login = function (data) {
        if (data['code'] == 0) {
            var shap = GameUtil.createCircle(this.mStageW / 2, this.mStageH / 2, 100, 0.8, 0xff0000);
            this.addChild(shap);
            var slef = this;
            var tag = egret.Tween.get(shap).to({ alpha: 0 }, 500).call(function () {
                slef.removeChild(shap);
                egret.Tween.removeTweens(tag);
            });
            this.scrollball.width = 100;
        }
        else if (data['code'] == 1) {
            var userinfo = data['result'];
            GameData.getInstance().UserInfo['ID'] = userinfo['cardid'];
            GameData.getInstance().UserInfo['Name'] = userinfo['username'];
            GameData.getInstance().UserInfo['Sex'] = userinfo['sex'];
            GameData.getInstance().UserInfo['Isvote'] = userinfo['isvote'];
            console.log("userinfo====", GameData.getInstance().UserInfo);
            this.removeChild(this.dispCont);
            var d = 1000;
            var hompage = new HomePage();
            GameUtil.GameScene.runscene(hompage, GameUtil.GameConfig.OpenDoor, 1000);
            hompage.mask = this.maskrect;
            egret.Tween.get(this.doorContL).to({ x: -320 }, d);
            egret.Tween.get(this.doorContR).to({ x: 960 }, d);
            egret.Tween.get(this.maskrect).to({ x: 0, width: 640 }, d / 2);
        }
    };
    return LoginPage;
})(GameUtil.BassPanel);
LoginPage.prototype.__class__ = "LoginPage";
