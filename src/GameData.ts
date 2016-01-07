/**
 * Created by pior on 16/1/7.
 */

class GameData
{

    public UserInfo:Object = {
        'ID':0,
        'Name':'',
        'Sex':''
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