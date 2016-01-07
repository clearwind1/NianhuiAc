/**
 * Created by pior on 16/1/7.
 */

class VotePage extends GameUtil.BassPanel
{
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
    }

}