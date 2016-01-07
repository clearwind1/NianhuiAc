/**
 * Created by pior on 16/1/7.
 */
var GameData = (function () {
    function GameData() {
        this.UserInfo = {
            'ID': 0,
            'Name': '',
            'Sex': ''
        };
    }
    var __egretProto__ = GameData.prototype;
    GameData.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameData();
        }
        return this.instance;
    };
    GameData.instance = null;
    return GameData;
})();
GameData.prototype.__class__ = "GameData";
