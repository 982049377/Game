class GameScene extends egret.DisplayObjectContainer implements EventEmitter {
    public map: TileMap;
    public taskCondition: conditionObserver[];
    constructor(map: TileMap) {
        super();
        this.taskCondition = [];
        this.map = map;
        this.user = User.getInstance();
        this.idle = new Idle(this.user.role, User.idlelist);
        this.walk = new Walk(this.user.role, User.walklist);
        this.mapMove();
        GameScene.mapOffsetX = 0;
    }
    public replaceamap(map: TileMap) {
        this.map = map;
    }
    public getCurrentamap(): TileMap {
        return this.map;
    }
    public moveTo(x: number, y: number, callback: Function) {
        //console.log("开始移动")
        this.walkToDestination(x, y);
        // egret.setTimeout(function () {
        //     console.log("结束移动")
        //     callback();
        // }, this, 500)
        egret.startTick((): boolean => {
            if (this.map._astar._path[0] != null) {
                if (this.user.role.x == (this.map._astar._path[0].x) * this.map.MapSize + 50 && this.user.role.y == this.map._astar._path[0].y * this.map.MapSize + 50) {
                    this.user.role.SetState(this.idle);
                    callback();
                    //this.setAstar(); 
                }
            }
            return false;
        }, this);
    }

    public stopMove(callback: Function) {
        this.clearAstar();
    }

    public static mapOffsetX = 0;
    private offsetx: number;
    private user: User;
    private idle: Idle;
    private walk: Walk;
    private walkToDestination(DestinationX: number, DestinationY: number) {

        this.clearAstar();
        this.map._astar.setStartNode(Math.floor((this.user.role.x) / 100), Math.floor(this.user.role.y / 100));
        this.map._astar.setEndNode(Math.floor((DestinationX + GameScene.mapOffsetX) / 100), Math.floor(DestinationY / 100));
        //console.log("DestinationX" + Math.floor((DestinationX + GameScene.mapOffsetX) / 100));
        var i = this.map._astar.findPath();
        if (i == 1) {
            this.user.role.SetState(this.walk)
            //egret.Tween.removeTweens(this._player);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.onEnterFrame;
            //this.Move();
            i = 2
        }
        else
            if (i == 0) {
                this.user.role.SetState(this.idle);
                this.clearAstar();
                i = 2;
            }
            else
                if (i == -1) {
                    this.user.role.SetState(this.idle);
                    this.clearAstar();
                    i = 2;
                }

    }

    /**帧事件' */
    private step: number = 10;
    private i = 2;
    private onEnterFrame(event: egret.Event): void {
        //console.log('hi');
        var n = this.map._astar._path.length;
        //console.log(n - this.i);
        if (n - this.i < 0)
            return;
        var targetX: number = this.map._astar._path[n - this.i].x * this.map.MapSize + this.map.MapSize / 2;
        var targetY: number = this.map._astar._path[n - this.i].y * this.map.MapSize + this.map.MapSize / 2;
        var dx: number = targetX - this.user.role.x;
        var dy: number = targetY - this.user.role.y;
        var dist: number = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.step * 2) {
            this.i++;
            if (this.i > this.map._astar._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                //console.log('remove');
            }
        }
        else {
            if (targetX - this.user.role.x > this.step)
                this.user.role.x += this.step;
            if (targetY - this.user.role.y > this.step)
                this.user.role.y += this.step;
            if (this.user.role.x - targetX > this.step)
                this.user.role.x -= this.step;
            if (this.user.role.y - targetY > this.step)
                this.user.role.y -= this.step;
            if (Math.abs(this.user.role.x - targetX) <= this.step) {
                this.user.role.x = targetX;
            }
            if (Math.abs(this.user.role.y - targetY) <= this.step) {
                this.user.role.y = targetY;
            }
        }
    }

    private clearAstar(): void {
        egret.Tween.removeTweens(this.user.role);
        this.map._astar.setStartNode(Math.floor(this.user.role.x / 100), Math.floor(this.user.role.y / 100));
        this.map._astar.empty();
        this.i = 1;
    }
    /***地图 */
    private mapMove() {


        this.map.parent.touchEnabled = true;
        this.map.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            this.prevX = e.stageX;
            //this.offsetx=e.stageX-this._bg.x;
            this.map.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            //console.log("mapmove");
        }, this);
        this.map.parent.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        }, this)
    }


    private prevX: number = 0;
    private onMove(e: egret.TouchEvent) {
        //this._bg.x+=offsetx;
        //console.log("onMove");
        this.offsetx = this.prevX - e.stageX;
        //console.log("mapMove");
        if (this.offsetx > 100) {
            egret.Tween.get(this.map.parent).to({ x: -360 }, 200);

            GameScene.mapOffsetX = 360;
        }
        if (this.offsetx < -100) {
            //console.log("12345789465413213212313");
            egret.Tween.get(this.map.parent).to({ x: 0 }, 200)
            GameScene.mapOffsetX = 0;
        }
    }

    public addconditionObserver(tempTaskCondition: conditionObserver) {
        this.taskCondition.push(tempTaskCondition);
    }


    public notify(id: string) {
        for (var i of this.taskCondition) {
            i.onchange(id);
            console.log("杀怪了");
        }
        //var task=TaskService.getIntance()._tasklist[id];
        //TaskService.getIntance().notify().
    }
}




class SecneManager {
    currentScene: GameScene;
    Scenelist: GameScene[];
    constructor() {
        this.Scenelist = new Array<GameScene>();
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
