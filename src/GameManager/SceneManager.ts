class GameScene {
    public map: TileMap;
    constructor(map: TileMap) {
        this.map = map;
    }
    public replaceamap(map: TileMap) {
        this.map = map;
    }
    public getCurrentamap(): TileMap {
        return this.map;
    }
    // public moveTo(x: number, y: number, callback: Function) {
    //     console.log ("开始移动")
    //     egret.setTimeout(function () {
    //         console.log("结束移动")
    //         callback();
    //     }, this, 500)
    // }

    // public stopMove(callback:Function){
    //     console.log ("取消移动")
    //     callback();
    // }

}

class SecneManager {
    currentScene: GameScene;
    Scenelist: GameScene[];
    constructor() {
        this.Scenelist = new Array < GameScene > ();
    }
    public addScene(scene: GameScene) {
        this.Scenelist.push(scene);
        if (this.Scenelist.length == 1) {
            this.currentScene = this.Scenelist[0];
        }
    }
    public removeScene(scene: GameScene) {
        var i = this.Scenelist.indexOf(scene);
        this.Scenelist.splice(i);
    }
    public setCurrentScene(scene: GameScene) {
        this.currentScene = scene;
        this.Scenelist.forEach(element => {
            if (element == scene)
                return;
        });
        this.Scenelist.push(scene);
    }
}
