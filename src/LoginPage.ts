/**
 * Created by pior on 16/1/7.
 */

class LoginPage extends GameUtil.BassPanel
{

    private dispCont: egret.DisplayObjectContainer;
    private doorContL: egret.Bitmap;
    private doorContR: egret.Bitmap;

    private userinput: GameUtil.InputTextFiled;

    private scrollball: egret.Bitmap;
    private SPoint: egret.Point = new egret.Point;

    private maskrect: egret.Rectangle = new egret.Rectangle(320,0,0,1136);

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

        var inputframe: egret.Bitmap = GameUtil.createBitmapByName("inputframe_png");
        inputframe.x = this.mStageW/2;
        inputframe.y = this.mStageH/2+50;
        this.dispCont.addChild(inputframe);

        this.userinput = GameUtil.createInputText(this.mStageW/2,this.mStageH/2+50,30,80,30,3);
        this.userinput.anchorX = this.userinput.anchorY = 0.5;
        this.userinput.textAlign = egret.HorizontalAlign.CENTER;
        this.userinput.textColor = 0x000000;
        this.userinput.setBaseTextSize(30,30);
        this.dispCont.addChild(this.userinput);


        //logo
        var logoimg: egret.Bitmap = GameUtil.createBitmapByName("loadingbar_png");
        logoimg.x = this.mStageW/2;
        logoimg.y = 160;
        this.dispCont.addChild(logoimg);

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

        this.scrollball.touchEnabled = true;
        this.scrollball.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchsballbegin,this);
        this.scrollball.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchsballmove,this);
        this.scrollball.addEventListener(egret.TouchEvent.TOUCH_END,this.touchsballend,this);

    }

    private touchsballbegin(e:egret.TouchEvent):void
    {
        //console.log("touchbeing");
        this.SPoint.x = e.stageX;

    }
    private touchsballmove(e:egret.TouchEvent):void
    {
        //console.log("touchmove");

        var px = e.stageX;

        if(px - this.SPoint.x > 0 && this.scrollball.width <= 400){
            this.scrollball.width =100 + px - this.SPoint.x;
        }

    }
    private touchsballend(e:egret.TouchEvent):void
    {
        //console.log("touchend======",this.scrollball.width);
        if(this.scrollball.width <= 280){
            this.scrollball.width = 100;
        }
        else
        {
            this.scrollball.width = (this.scrollball.width > 400 ? this.scrollball.width : 400);
            this.checkUserID();
        }
    }


    private checkUserID():void
    {
        var id: number = Number(this.userinput.text);
        console.log("id====",id);
        this.Login(null);
    }

    private Login(data:any):void
    {

        GameData.getInstance().UserInfo['ID'] = Number(this.userinput.text);


        var hompage = new HomePage();
        GameUtil.GameScene.getStage().addChild(hompage);
        hompage.mask = this.maskrect;

        this.removeChild(this.dispCont);

        var d: number = 1000;

        egret.Tween.get(this.doorContL).to({x:-320},d).call(this.remove,this);
        egret.Tween.get(this.doorContR).to({x:960},d);
        egret.Tween.get(this.maskrect).to({x:0,width:640},d/2);
    }

    private remove():void
    {
        GameUtil.GameScene.getStage().removeChild(this);
    }

}