/**
 * 投票
 * Created by pior on 16/1/7.
 */

class VotePage extends GameUtil.BassPanel
{

    private scrolltext: egret.TextField;
    private scrolltext2: egret.TextField;

    private curticketCount: egret.Bitmap[] = [];
    private curticketCountext: egret.TextField[] = [];

    private votecount: number[] = [0,0,0,0,0,0,0];

    public constructor()
    {
        super();
    }
    public init()
    {
        var parm: Object = {
        }
        GameUtil.Http.getinstance().send(parm,"/account/getvote",this.getvotePage,this);
    }

    /**
     * 获取投票信息
     * @param data
     */
    private getvotePage(data:any):void
    {
        if(data['code'] == 0){
            GameUtil.GameScene.runscene(new HomePage());
        }
        else
        {
            var bg: egret.Bitmap = GameUtil.createBitmapByName("bgImage");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);

            var bgtext: egret.TextField = GameUtil.createTextField(this.mStageW/2,40,40);
            bgtext.text = '节目人气';
            bgtext.bold = true;
            bgtext.textColor = 0x000000;
            this.addChild(bgtext);

            var proName: string[] = ['《小宝贝》','《海阔天空》','《小人舞》','《007》','《天竺少女》','《拉丁舞》','《华尔兹》'];
            var prodeparmtext: string[] = ['品宣部','页游公会','品宣部','页游公会','手游公会','综合事务部','多部门协作'];
            for(var i:number=0;i < 7;i++){

                this.votecount[i] = data['result'][i]['votecount'];
                console.log("ticketcount=====",this.votecount[i]);
                //投票比例条
                this.curticketCount[i] = GameUtil.createBitmapByName("ticketCount"+i+"_png");
                this.curticketCount[i].anchorX = 0;
                this.curticketCount[i].scale9Grid = new egret.Rectangle(8,7,1,1);
                this.curticketCount[i].x = 30;
                this.curticketCount[i].y = 200+140*i;
                this.curticketCount[i].width = 17+(this.votecount[i]/209)*500;
                this.addChild(this.curticketCount[i]);

                this.curticketCountext[i] = GameUtil.createTextField(this.curticketCount[i].width+40,200+140*i,20,0,0.5,egret.HorizontalAlign.LEFT);
                this.curticketCountext[i].text = this.votecount[i] + "票";
                this.curticketCountext[i].textColor = 0x000000;
                this.addChild(this.curticketCountext[i]);

                //节目部门
                var prodeparm: egret.TextField = GameUtil.createTextField(600,150+140*i,30,1,1,egret.HorizontalAlign.RIGHT);
                prodeparm.text = prodeparmtext[i];
                prodeparm.textColor = 0x000000;
                this.addChild(prodeparm);

                //节目
                var btn: GameUtil.Menu = new GameUtil.Menu(this,"","",this.vote,[i]);
                btn.width = 200;
                btn.addButtonText(proName[i]);
                btn.getBtnText().anchorX = 0;
                btn.getBtnText().size = 30;
                btn.getBtnText().textColor = 0x000000;
                btn.getBtnText().textAlign = egret.HorizontalAlign.LEFT;
                btn.x = 130;
                btn.y = 150 + 140*i;
                btn.setScaleMode();
                this.addChild(btn);
            }

            var exitbtn: GameUtil.Menu = new GameUtil.Menu(this,"","",this.exit);
            exitbtn.x = 500;
            exitbtn.y = 40;
            exitbtn.addButtonText("返回");
            exitbtn.setScaleMode();
            exitbtn.getBtnText().size = 30;
            exitbtn.getBtnText().textColor = 0x000000;
            this.addChild(exitbtn);

            //底部滚动文字
            this.scrolltext = GameUtil.createTextField(this.mStageW/2,1100,30);
            this.scrolltext.text = '点击节目名称，为自己喜欢的节目拉人气';
            this.scrolltext.textColor = 0x000000;
            this.scrolltext.visible = false;
            this.addChild(this.scrolltext);
            this.scrolltext2 = GameUtil.createTextField(this.mStageW/2 + 640,1100,30);
            this.scrolltext2.text = '点击节目名称，为自己喜欢的节目拉人气';
            this.scrolltext2.textColor = 0x000000;
            this.scrolltext2.visible = false;
            this.addChild(this.scrolltext2);

            if(GameData.getInstance().UserInfo['Isvote'] == 0){
                this.scrolltext.visible = true;
                this.scrolltext2.visible = true;
            }

            egret.setInterval(this.scrolltextmove,this,100);
        }
    }

    /**
     * 用户投票回调
     * @param id
     */
    private vote(id:any):void
    {

        if(GameData.getInstance().UserInfo['Isvote'] == 1){
            return;
        }

        console.log("vote====",Number(GameData.getInstance().UserInfo['ID'].substr(4)));
        var proid:number = id+1;
        var parm: Object = {
            cardid: Number(GameData.getInstance().UserInfo['ID'].substr(4)),
            programid: proid
        }
        GameUtil.Http.getinstance().send(parm,"/account/vote",this.voteResult,this);

        //this.votecount[id]++;
        //this.curticketCount = ticketCount;
        //this.curticketCountext = ticketcountext;
        //this.voteResult(id);
    }

    /**
     * 用户投票结果
     * @param data
     */
    private voteResult(data:any):void
    {

        console.log("data====",data);

        if(data['code']==1){
            //this.curticketCount.width = Math.floor(this.votecount[id]/209)*500;
            //this.curticketCountext.text = this.votecount[id]+'票';
            //this.curticketCountext.x = this.curticketCount.width + 40;

            for(var i:number=0;i < 7;i++){
                this.votecount[i] = data['result'][i]['votecount'];
                this.curticketCountext[i].text = this.votecount[i] + "票";
                this.curticketCount[i].width = 17+(this.votecount[i]/209)*500;
                this.curticketCountext[i].x = this.curticketCount[i].width + 40;
            }

            GameData.getInstance().UserInfo['Isvote'] = 1;
            this.scrolltext.visible = false;
            this.scrolltext2.visible = false;
        }

    }

    private scrolltextmove():void
    {
        this.scrolltext.x -= 10;
        this.scrolltext2.x -=10;

        if(this.scrolltext.x == -320){
            this.scrolltext.x = this.mStageW/2 + 640;
        }
        if(this.scrolltext2.x == -320){
            this.scrolltext2.x = this.mStageW/2 + 640;
        }
    }

    private exit():void
    {
        GameUtil.GameScene.runscene(new HomePage());
    }

}