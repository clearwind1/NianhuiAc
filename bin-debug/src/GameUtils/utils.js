/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    //游戏配置
    var GameConfig = (function () {
        function GameConfig() {
        }
        var __egretProto__ = GameConfig.prototype;
        GameConfig.IP = "m.km1818.com/wsyx"; //http连接地址
        GameConfig.bRunFPS = false; //是否显示FPS
        //场景转换
        GameConfig.NullAction = 0; //无动画
        GameConfig.CrossLeft = 1; //从左往右
        GameConfig.TransAlpha = 2; //淡入淡出
        return GameConfig;
    })();
    GameUtil.GameConfig = GameConfig;
    GameConfig.prototype.__class__ = "GameUtil.GameConfig";
    /**
     * 创建一张位图
     * @param name {string} 位图文件名
     * @returns {egret.Bitmap} 位图
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorX = result.anchorY = 0.5;
        return result;
    }
    GameUtil.createBitmapByName = createBitmapByName;
    /**
     * 创建文字
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param size {number} 大小
     * @param anchorX {number} X轴锚点
     * @param anchorY {number} Y轴锚点
     * @param align {string} 对齐方式
     * @returns {egret.TextField} 文字
     */
    function createTextField(x, y, size, anchorX, anchorY, align) {
        if (anchorX === void 0) { anchorX = 0.5; }
        if (anchorY === void 0) { anchorY = 0.5; }
        if (align === void 0) { align = egret.HorizontalAlign.CENTER; }
        var textfiled = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.anchorX = anchorX;
        textfiled.anchorY = anchorY;
        textfiled.size = size;
        textfiled.textAlign = align;
        return textfiled;
    }
    GameUtil.createTextField = createTextField;
    /**
     * 创建一个输入文本
     * @param x
     * @param y
     * @param size
     * @param width
     * @param height
     * @param maxChars 最大输入数量
     * @returns {egret.TextField}
     */
    function createInputText(x, y, size, width, height, maxChars) {
        if (maxChars === void 0) { maxChars = 0; }
        var textfiled = new GameUtil.InputTextFiled();
        textfiled.type = egret.TextFieldType.INPUT;
        textfiled.text = "";
        textfiled.x = x;
        textfiled.y = y;
        textfiled.width = width;
        textfiled.height = height;
        textfiled.size = size;
        textfiled.maxChars = maxChars;
        textfiled.textAlign = egret.HorizontalAlign.LEFT;
        return textfiled;
    }
    GameUtil.createInputText = createInputText;
    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    function createRect(x, y, width, height, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createRect = createRect;
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    function objectToString(postData) {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    GameUtil.objectToString = objectToString;
    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    function isChineseName(name) {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }
    GameUtil.isChineseName = isChineseName;
    function removeimag(name) {
        name = name.replace(/^/, '');
        return name;
    }
    GameUtil.removeimag = removeimag;
    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    function isPhoneNum(num) {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }
    GameUtil.isPhoneNum = isPhoneNum;
    /**
     * 数字向上飘动动画
     * @param thisObj
     * @param x
     * @param y
     * @param size
     * @param number
     * @param color
     */
    function numberUpDisp(thisObj, x, y, size, number, color) {
        var textfiled = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.anchorX = 0.5;
        textfiled.anchorY = 0.5;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;
        thisObj.addChild(textfiled);
        egret.Tween.get(textfiled).to({ y: y - 40 }, 700);
        egret.Tween.get(textfiled).to({ alpha: 0 }, 700).call(function () {
            thisObj.removeChild(textfiled);
        }, thisObj);
    }
    GameUtil.numberUpDisp = numberUpDisp;
    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    function saveLocalData(key, data) {
        egret.localStorage.setItem(key, data);
    }
    GameUtil.saveLocalData = saveLocalData;
    function readLocalData(key) {
        egret.localStorage.getItem(key);
    }
    GameUtil.readLocalData = readLocalData;
    function clearLocalData(key) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    GameUtil.clearLocalData = clearLocalData;
})(GameUtil || (GameUtil = {}));
