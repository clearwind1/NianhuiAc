/**
 * 游戏数据
 * Created by pior on 16/1/7.
 */

class GameData
{
    //用户信息，ID，姓名，性别，是否投过票，openid
    public UserInfo:Object = {
        'ID':'',
        'Name':'',
        'Sex':'',
        'Isvote':0,
        'openid':''
    };

    public constructor()
    {

    }


    private static instance:GameData = null;
    public static getInstance():GameData
    {
        if(this.instance == null){
            this.instance = new GameData();
        }

        return this.instance;
    }


}