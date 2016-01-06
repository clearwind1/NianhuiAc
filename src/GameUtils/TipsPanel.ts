/**
 * 提示框
 * Created by pior on 15/10/28.
 */

module GameUtil
{
    export class TipsPanel extends egret.DisplayObjectContainer
    {
        private textsize:number = 30;
        private tipText:string;
        private tipbg:egret.Bitmap;
        private text:egret.TextField;
        private tipImg:string;
        private bDisappear:boolean;
        private disSecond:number;

        public mStageW = egret.MainContext.instance.stage.stageWidth;
        public mStageH = egret.MainContext.instance.stage.stageHeight;

        /**
         * 创建一个提示框
         * @param tipimg 提示框图片名
         * @param tipText 提示文字
         * @param disp 是否自己消失
         * @param sec 自己消失时间
         */
        public constructor(tipimg:string,tipText:string,disp:boolean=false,sec:number=1200)
        {
            super();
            this.tipText = tipText;
            this.tipImg = tipimg;
            this.bDisappear = disp;
            this.disSecond = sec;

            this.init();
        }
        public init():void
        {
            if(!this.bDisappear) {
                var coverbg:egret.Shape = GameUtil.createRect(0, 0, 480, 800, 0.4);
                this.addChild(coverbg);
                this.touchEnabled = true;
            }

            this.tipbg = createBitmapByName(this.tipImg);
            this.tipbg.x = this.mStageW/2;
            this.tipbg.y = this.mStageH/2;
            this.addChild(this.tipbg);

            this.showtip();
            if(!this.bDisappear)
            {
                this.showbutton();
            }
            else
            {
                var tw = egret.Tween.get(this);
                tw.to({alpha:1},300).to({alpha:0},this.disSecond).call(this.close,this);
            }

        }

        /**
         * 显示提示文字
         */
        private showtip():void
        {
            this.text = createTextField(this.mStageW/2,this.mStageH/2,this.textsize);
            this.text.text = this.tipText;
            this.text.textColor = 0x000000;
            this.addChild(this.text);
        }

        /**
         * 提示文字的长度
         * @param width 长度
         */
        public setTextwidth(width:number):void
        {
            this.text.width = width;
        }

        /**
         * 提示文字字体大小
         * @param size 尺寸
         */
        public setTextSize(size:number):void
        {
            this.text.size = size;
        }
        public setTextHor(anchorX:number,anchorY:number,align:string,offx:number):void
        {
            this.text.anchorX = anchorX;
            this.text.anchorY = anchorY;
            this.text.textAlign = align;
            this.text.x = this.mStageW/2 - this.tipbg.width/2 + offx;
        }
        public setTextlineSpacing(spacing:number):void
        {
            this.text.lineSpacing = spacing;
        }

        /**
         * 显示确认按钮
         */
        private showbutton():void
        {
            var surebtn:Menu = new Menu(this,"acceptBtn_png","acceptBtn_png",this.close);
            surebtn.x = this.mStageW/2;
            surebtn.y = this.mStageH/2 + this.tipbg.texture.textureHeight/2;
            this.addChild(surebtn);
            surebtn.setScaleMode();
        }

        private close():void
        {
            this.parent.removeChild(this);
        }

    }
}