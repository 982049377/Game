class Monster extends egret.DisplayObjectContainer {
    properties: Property;
    private static Id = 0;
    private hp = 0;
    private hpLImit = 0;
    private alive = true;
    constructor() {
        super();
        this.properties = new Property();
        Monster.Id++;
        this.tempid = Monster.Id;
        this.addChild(this.properties._bitmap);
    }

    tempid = 0;
    call(id: string, name: string, atk: number, def: number, bitmap: egret.Bitmap, hp: number) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
        this.hp = hp;
        this.hpLImit = hp;
        this.tap();
    }
    tap() {
        this.properties._bitmap.touchEnabled = true;
        this.properties._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            var list = new CommandList();
            var walk = new WalkCommand(this.x - GameScene.mapOffsetX, this.y);
            var fight = new FightCommand();
            list.addCommand(walk);
            list.addCommand(fight);
            list.execute();
            this.hp -= 50;
            this.checkAlive();
            console.log("战斗");
        }, this);
    }
    private checkAlive() {
        if (this.hp <= this.hpLImit) {
            this.alive = false;
            this.properties._bitmap.touchEnabled = false;
            GameManager.getInstance().secneManager.currentScene.notify(this.properties.configId);
        }
        else {
            this.alive = true;
        }

    }
}