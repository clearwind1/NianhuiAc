/**
 * 用户登录界面
 * Created by pior on 16/1/7.
 */

class LoginPage extends GameUtil.BassPanel
{

    private dispCont: egret.DisplayObjectContainer;     //界面用户操作显示容器
    private doorContL: egret.Bitmap;                    //左门
    private doorContR: egret.Bitmap;                    //右门

    private userinput: GameUtil.InputTextFiled;         //员工号输入

    private scrollball: egret.Bitmap;                   //滑动按钮
    private SPoint: egret.Point = new egret.Point;      //起始点

    private maskrect: egret.Rectangle = new egret.Rectangle(320,0,0,1136);  //下一场景遮罩

    private touchactive: boolean = false;               //触摸标志

    public constructor()
    {
        super();
    }
    public init()
    {
        //左右门
        this.doorContL = GameUtil.createBitmapByName("doorl_jpg");
        this.doorContL .x = 160;
        this.doorContL .y = this.mStageH/2;
        this.addChild(this.doorContL );

        this.doorContR = GameUtil.createBitmapByName("doorr_jpg");
        this.doorContR.x = 480;
        this.doorContR.y = this.mStageH/2;
        this.addChild(this.doorContR);

        this.dispCont = new egret.DisplayObjectContainer();
        this.addChild(this.dispCont);

        this.show();
    }

    private show()
    {
        var usertip: egret.TextField = GameUtil.createTextField(this.mStageW/2,this.mStageH/2,30);
        usertip.text = '请输入\n您的幸运工号';
        usertip.textColor = 0x000000;
        this.dispCont.addChild(usertip);

        //console.log("dispCont=====",this.dispCont.width);
        //输入框
        var inputframe: egret.Bitmap = GameUtil.createBitmapByName("inputframe_png");
        inputframe.x = this.mStageW/2;
        inputframe.y = this.mStageH/2+50;
        inputframe.scaleX = 1.5;
        this.dispCont.addChild(inputframe);

        this.userinput = GameUtil.createInputText(this.mStageW/2,this.mStageH/2+50,25,210,30,7);
        this.userinput.anchorX = this.userinput.anchorY = 0.5;
        this.userinput.textAlign = egret.HorizontalAlign.CENTER;
        this.userinput.textColor = 0x000000;
        this.userinput.setBaseTextSize(30,30);
        this.userinput.text = '8872942';
        this.dispCont.addChild(this.userinput);


        //logo
        var logoimg: egret.Bitmap = GameUtil.createBitmapByName("loadingbar_png");
        logoimg.x = this.mStageW/2;
        logoimg.y = 160;
        this.dispCont.addChild(logoimg);

        //滑动底条
        var scrollbar: egret.Bitmap = GameUtil.createBitmapByName("scrollBar_png");
        scrollbar.x = this.mStageW/2;
        scrollbar.y = 868;
        this.dispCont.addChild(scrollbar);

        this.scrollball = GameUtil.createBitmapByName("scrollBall_png");
        this.scrollball.anchorX = 0;
        this.scrollball.x = 120;
        this.scrollball.y = 868;
        this.scrollball.scale9Grid = new egret.Rectangle(10,10,380,80);
        this.scrollball.width = 100;
        this.dispCont.addChild(this.scrollball);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchsballbegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchsballmove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchsballend,this);

    }

    private touchsballbegin(e:egret.TouchEvent):void
    {
        if(this.scrollball.hitTestPoint(e.stageX,e.stageY)){
            this.SPoint.x = e.stageX;
            this.touchactive = true;
        }
    }
    private touchsballmove(e:egret.TouchEvent):void
    {
        //console.log("touchmove");

        if(this.touchactive){
            var px = 100 + e.stageX - this.SPoint.x;
            if(px >= 400){
                px = 400;
            }
            if(px > 100){
                this.scrollball.width = px;
            }
        }
    }
    private touchsballend(e:egret.TouchEvent):void
    {
        //console.log("touchend======",this.scrollball.width);
        if(this.touchactive)
        {
            if(this.scrollball.width <= 280){
                this.scrollball.width = 100;
            }
            else
            {
                this.scrollball.width = (this.scrollball.width > 400 ? this.scrollball.width : 400);
                this.checkUserID();
            }
        }

        this.touchactive = false;

    }

    /**
     * 登录检测
     */
    private checkUserID():void
    {
        var id: number = Number(this.userinput.text.substr(0,3));
        var code: number = Number(this.userinput.text.substr(3));
        console.log("id====",id,"code======",code);

        var parm: Object = {
            cardid: id,
            verifycode: code
        }
        GameUtil.Http.getinstance().send(parm,"/account/login",this.Login,this);
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


    }

    /**
     * 登录
     * @param data
     * @constructor
     */
    private Login(data:any):void
    {

        if(data['code'] == 0){
            var shap: egret.Shape = GameUtil.createCircle(this.mStageW/2,this.mStageH/2,100,0.8,0xff0000);
            this.addChild(shap);

            var slef = this;
            var tag = egret.Tween.get(shap).to({alpha:0},500).call(function(){
                slef.removeChild(shap);
                egret.Tween.removeTweens(tag);
            })

            this.scrollball.width = 100;
        }
        else if(data['code'] == 1){

            var userinfo: any = data['result'];

            GameData.getInstance().UserInfo['ID'] = userinfo['cardid'];
            GameData.getInstance().UserInfo['Name'] = userinfo['username'];
            GameData.getInstance().UserInfo['Sex'] = userinfo['sex'];
            GameData.getInstance().UserInfo['Isvote'] = userinfo['isvote'];

            console.log("userinfo====",GameData.getInstance().UserInfo);

            this.removeChild(this.dispCont);

            var d: number = 1000;

            var hompage = new HomePage();
            GameUtil.GameScene.runscene(hompage,GameUtil.GameConfig.OpenDoor,1000);
            hompage.mask = this.maskrect;

            egret.Tween.get(this.doorContL).to({x:-320},d);
            egret.Tween.get(this.doorContR).to({x:960},d);
            egret.Tween.get(this.maskrect).to({x:0,width:640},d/2);
        }
    }

}