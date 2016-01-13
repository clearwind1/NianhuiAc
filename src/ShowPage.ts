/**
 * 主页
 * Created by pior on 16/1/6.
 */

class HomePage extends GameUtil.BassPanel
{

    private handlimg: egret.Bitmap;         //左手
    private handrimg: egret.Bitmap;         //右手

    private redpacketcon: egret.DisplayObjectContainer;     //红包信息

    public constructor()
    {
        super();
    }
    public init()
    {
        this.show();
    }

    private show()
    {
        var bg: egret.Bitmap = GameUtil.createBitmapByName("bgImage");
        bg.x = this.mStageW/2;
        bg.y = this.mStageH/2;
        this.addChild(bg);

        var headimg: egret.Bitmap = GameUtil.createBitmapByName("headimg_png");
        headimg.x = this.mStageW/2;
        headimg.y = 200;
        this.addChild(headimg);

        //用户信息
        var userinfo: egret.TextField = GameUtil.createTextField(this.mStageW/2,320,30);
        userinfo.textFlow = <Array<egret.ITextElement>>[
            {'text':GameData.getInstance().UserInfo['ID'],'style':{'textColor':0x000000}},
            {'text':"\n"+GameData.getInstance().UserInfo['Name'],'style':{'textColor':0x000000}}
        ];
        this.addChild(userinfo);

        this.handlimg = GameUtil.createBitmapByName("handimg_png");
        this.handlimg.x = this.mStageW/2 - 140;
        this.handlimg.y = 250;
        this.addChild(this.handlimg);

        egret.Tween.get(this.handlimg,{loop:true}).to({y:220},800).to({y:250},800);

        this.handrimg = GameUtil.createBitmapByName("handimg_png");
        this.handrimg.x = this.mStageW/2 + 140;
        this.handrimg.y = 250;
        this.addChild(this.handrimg);

        egret.Tween.get(this.handrimg,{loop:true}).to({y:220},800).to({y:250},800);

        //抢红包与投票按钮
        var btnfun: Function[] = [this.snatchRedpacket,this.voteActive];
        var btntext: string[] = ['抢红包','为当前节目投票\n#投票排行#'];
        for(var i:number = 0;i < 2;i++){
            var btn: GameUtil.Menu = new GameUtil.Menu(this,"greenframe_png","greenframe_png",btnfun[i]);
            btn.setScaleMode();
            btn.addButtonText(btntext[i]);
            btn.getBtnText().size = 40;
            btn.getBtnText().textColor = 0xff0000;
            btn.x = this.mStageW/2;
            btn.y = 768 + i*150;
            this.addChild(btn);
        }

    }

    //抢红包
    private snatchRedpacket():void
    {
        //console.log("抢红包");

        var ipstr: string = window['getIP'];

        console.log("ipstr=====",ipstr,"ipstr[0]======",ipstr.split('|'));
        ipstr = ipstr.split('|')[1];

        var money: number = Math.floor((Math.random()*10));
        console.log("money======",money);

        var param: Object = {
            openId: GameData.getInstance().UserInfo['openid'],
            amount: money,
            ip: ipstr,
            nickname: "盛讯达",
            cardid: GameData.getInstance().UserInfo['ID']
        }
        GameUtil.Http.getinstance().send(param,"/weixinpay/pay",this.snatchResult,this);

        //var redcode: number = Math.floor((Math.random()*100)%3);
        //
        //var data: Object = {
        //    code: redcode,
        //    msg: 'timeout'
        //}
        //this.snatchResult(data);
    }
    //投票
    private voteActive():void
    {
        GameUtil.GameScene.runscene(new VotePage(),GameUtil.GameConfig.TransAlpha,300);
        //console.log("投票");
    }

    /**
     * 抢红包结果
     * @param data
     */
    private snatchResult(data:any):void
    {
        //时间未到
        if(data['code'] == 2){
           // console.log("时间未到");
            var self = this;
            var timeouttip: GameUtil.Menu = new GameUtil.Menu(this,"greenframe_png","greenframe_png",null);
            timeouttip.addButtonText('下一红包时间:\n'+data['msg']);
            timeouttip.getBtnText().textColor = 0xff0000;
            timeouttip.getBtnText().size = 40;
            timeouttip.x = this.mStageW/2;
            timeouttip.y = 768;
            this.addChild(timeouttip);
            egret.Tween.get(timeouttip).to({alpha:1},500).to({alpha:0},2000).call(function(){
                self.removeChild(timeouttip);
            },this);
        }
        //抢到红包
        if(data['code'] == 1){
            this.RedpacketCont(1,data['money']);
        }
        //没抢到红包
        if(data['code'] == 0){
            this.RedpacketCont(0);
        }

    }

    private packetcont: egret.DisplayObjectContainer;
    private redpacketimg: egret.Bitmap;

    /**
     * 红包结果显示
     * @param type  类型，0没成功，1成功
     * @param money 金额
     * @constructor
     */
    private RedpacketCont(type:number,money?:number):void
    {
        this.redpacketcon = new egret.DisplayObjectContainer();
        this.addChild(this.redpacketcon);

        var cov: egret.Shape = GameUtil.createRect(0,0,640,1136,0.2);
        this.redpacketcon.addChild(cov);
        this.redpacketcon.touchEnabled = true;

        this.packetcont = new egret.DisplayObjectContainer();
        this.packetcont.width = 640;
        this.redpacketcon.addChild(this.packetcont);

        this.redpacketimg = GameUtil.createBitmapByName("redpacket_png");
        this.redpacketimg.x = this.mStageW/2;
        this.redpacketimg.y = 1136+240;
        this.packetcont.addChild(this.redpacketimg);

        var redpacketext: egret.TextField = GameUtil.createTextField(this.mStageW/2,1315,25);
        redpacketext.textColor = 0x000000;
        redpacketext.alpha = 0;
        this.packetcont.addChild(redpacketext);

        var redpacketbtn: GameUtil.Menu = new GameUtil.Menu(this,"btnframe_png","btnframe_png",null);
        redpacketbtn.x = this.mStageW/2;
        redpacketbtn.y = 1495;
        redpacketbtn.alpha = 0;
        redpacketbtn.setScaleMode();
        this.packetcont.addChild(redpacketbtn);

        //抢红包成功
        if(type == 1){
            redpacketext.text = '恭喜你\n抢到了'+money+'.0元的红包';
            redpacketbtn.addButtonText('继续等红包');
            redpacketbtn.setBackFun(this.getRedpacket);
        }
        else
        {
            redpacketext.text = '好可惜\n这次差点就获得了红包';
            redpacketbtn.addButtonText('真·抢红包大法');
            redpacketbtn.setBackFun(this.getoffRedpacket);
        }

        redpacketbtn.getBtnText().size = 30;
        redpacketbtn.getBtnText().textColor = 0x000000;

        this.packetcontMove(redpacketext,redpacketbtn);

    }

    private packetcontMove(redpacketext:egret.TextField,redpacketbtn:GameUtil.Menu):void
    {
        var self = this;
        egret.Tween.get(this.packetcont).to({y:-600},1000);
        egret.Tween.get(this.redpacketimg,{loop:true}).to({scaleX:0},100).call(function(){
            self.redpacketimg.texture = RES.getRes("redpacketback_png");
        }).to({scaleX:1},100).to({scaleX:0},100).call(function(){
            self.redpacketimg.texture = RES.getRes("redpacket_png");
        }).to({scaleX:1},100);

        egret.setTimeout(function(){
            egret.Tween.removeAllTweens();
            self.handlimg.y = 250;
            self.handrimg.y = 250;
            egret.Tween.get(self.handlimg,{loop:true}).to({y:220},800).to({y:250},800);
            egret.Tween.get(self.handrimg,{loop:true}).to({y:220},800).to({y:250},800);

            self.redpacketimg.scaleX = 1;

            egret.Tween.get(redpacketbtn).to({alpha:1},800);
            egret.Tween.get(redpacketext).to({alpha:1},800);

        },this,1600);

    }

    private getRedpacket():void
    {
        this.removeChild(this.redpacketcon);
    }
    private getoffRedpacket():void
    {
        this.removeChild(this.redpacketcon);
        this.snatchRedpacket();
    }

}