/**
 * Created by pior on 16/1/7.
 */
var VotePage = (function (_super) {
    __extends(VotePage, _super);
    function VotePage() {
        _super.call(this);
    }
    var __egretProto__ = VotePage.prototype;
    __egretProto__.init = function () {
        this.show();
    };
    __egretProto__.show = function () {
        var bg = GameUtil.createBitmapByName("bgImage");
        bg.x = this.mStageW / 2;
        bg.y = this.mStageH / 2;
        this.addChild(bg);
    };
    return VotePage;
})(GameUtil.BassPanel);
VotePage.prototype.__class__ = "VotePage";
