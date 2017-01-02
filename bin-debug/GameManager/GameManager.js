var GameManager = (function () {
    function GameManager() {
        GameManager.count++;
        if (GameManager.count > 1)
            throw 'singleton!!';
        this.secneManager = new SecneManager();
        this.UIManager = new UIManager();
        this.effectManager = new EffectManager();
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (this.instance == null)
            this.instance = new GameManager();
        return this.instance;
    };
    GameManager.count = 0;
    return GameManager;
}());
egret.registerClass(GameManager,'GameManager');
var EffectManager = (function () {
    function EffectManager() {
    }
    var d = __define,c=EffectManager,p=c.prototype;
    return EffectManager;
}());
egret.registerClass(EffectManager,'EffectManager');
//# sourceMappingURL=GameManager.js.map