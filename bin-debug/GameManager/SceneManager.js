var GameScene = (function () {
    function GameScene(map) {
        this.map = map;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.replaceamap = function (map) {
        this.map = map;
    };
    p.getCurrentamap = function () {
        return this.map;
    };
    return GameScene;
}());
egret.registerClass(GameScene,'GameScene');
var SecneManager = (function () {
    function SecneManager() {
        this.Scenelist = new Array();
    }
    var d = __define,c=SecneManager,p=c.prototype;
    p.addScene = function (scene) {
        this.Scenelist.push(scene);
        if (this.Scenelist.length == 1) {
            this.currentScene = this.Scenelist[0];
        }
    };
    p.removeScene = function (scene) {
        var i = this.Scenelist.indexOf(scene);
        this.Scenelist.splice(i);
    };
    p.setCurrentScene = function (scene) {
        this.currentScene = scene;
        this.Scenelist.forEach(function (element) {
            if (element == scene)
                return;
        });
        this.Scenelist.push(scene);
    };
    return SecneManager;
}());
egret.registerClass(SecneManager,'SecneManager');
//# sourceMappingURL=SceneManager.js.map