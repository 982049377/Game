var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        _super.call(this);
        this.hp = 0;
        this.hpLImit = 0;
        this.alive = true;
        this.tempid = 0;
        this.properties = new Property();
        Monster.Id++;
        this.tempid = Monster.Id;
        this.addChild(this.properties._bitmap);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.call = function (id, name, atk, def, bitmap, hp) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
        this.hp = hp;
        this.hpLImit = hp;
        this.tap();
    };
    p.tap = function () {
        var _this = this;
        this.properties._bitmap.touchEnabled = true;
        this.properties._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var list = new CommandList();
            var walk = new WalkCommand(_this.x - GameScene.mapOffsetX, _this.y);
            var fight = new FightCommand();
            list.addCommand(walk);
            list.addCommand(fight);
            list.execute();
            _this.hp -= 50;
            _this.checkAlive();
            console.log("战斗");
        }, this);
    };
    p.checkAlive = function () {
        if (this.hp <= this.hpLImit) {
            this.alive = false;
            this.properties._bitmap.touchEnabled = false;
            GameManager.getInstance().secneManager.currentScene.notify(this.properties.configId);
        }
        else {
            this.alive = true;
        }
    };
    Monster.Id = 0;
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
//# sourceMappingURL=Monster.js.map