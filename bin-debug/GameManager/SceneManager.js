var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(map) {
        _super.call(this);
        /**帧事件' */
        this.step = 10;
        this.i = 2;
        this.prevX = 0;
        this.taskCondition = [];
        this.map = map;
        this.user = User.getInstance();
        this.idle = new Idle(this.user.role, User.idlelist);
        this.walk = new Walk(this.user.role, User.walklist);
        this.mapMove();
        GameScene.mapOffsetX = 0;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.replaceamap = function (map) {
        this.map = map;
    };
    p.getCurrentamap = function () {
        return this.map;
    };
    p.moveTo = function (x, y, callback) {
        var _this = this;
        //console.log("开始移动")
        this.walkToDestination(x, y);
        // egret.setTimeout(function () {
        //     console.log("结束移动")
        //     callback();
        // }, this, 500)
        egret.startTick(function () {
            if (_this.map._astar._path[0] != null) {
                if (_this.user.role.x == (_this.map._astar._path[0].x) * _this.map.MapSize + 50 && _this.user.role.y == _this.map._astar._path[0].y * _this.map.MapSize + 50) {
                    _this.user.role.SetState(_this.idle);
                    callback();
                }
            }
            return false;
        }, this);
    };
    p.stopMove = function (callback) {
        this.clearAstar();
    };
    p.walkToDestination = function (DestinationX, DestinationY) {
        this.clearAstar();
        this.map._astar.setStartNode(Math.floor((this.user.role.x) / 100), Math.floor(this.user.role.y / 100));
        this.map._astar.setEndNode(Math.floor((DestinationX + GameScene.mapOffsetX) / 100), Math.floor(DestinationY / 100));
        //console.log("DestinationX" + Math.floor((DestinationX + GameScene.mapOffsetX) / 100));
        var i = this.map._astar.findPath();
        if (i == 1) {
            this.user.role.SetState(this.walk);
            //egret.Tween.removeTweens(this._player);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.onEnterFrame;
            //this.Move();
            i = 2;
        }
        else if (i == 0) {
            this.user.role.SetState(this.idle);
            this.clearAstar();
            i = 2;
        }
        else if (i == -1) {
            this.user.role.SetState(this.idle);
            this.clearAstar();
            i = 2;
        }
    };
    p.onEnterFrame = function (event) {
        //console.log('hi');
        var n = this.map._astar._path.length;
        //console.log(n - this.i);
        if (n - this.i < 0)
            return;
        var targetX = this.map._astar._path[n - this.i].x * this.map.MapSize + this.map.MapSize / 2;
        var targetY = this.map._astar._path[n - this.i].y * this.map.MapSize + this.map.MapSize / 2;
        var dx = targetX - this.user.role.x;
        var dy = targetY - this.user.role.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.step * 2) {
            this.i++;
            if (this.i > this.map._astar._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
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
    };
    p.clearAstar = function () {
        egret.Tween.removeTweens(this.user.role);
        this.map._astar.setStartNode(Math.floor(this.user.role.x / 100), Math.floor(this.user.role.y / 100));
        this.map._astar.empty();
        this.i = 1;
    };
    /***地图 */
    p.mapMove = function () {
        var _this = this;
        this.map.parent.touchEnabled = true;
        this.map.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.prevX = e.stageX;
            //this.offsetx=e.stageX-this._bg.x;
            _this.map.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onMove, _this);
            //console.log("mapmove");
        }, this);
        this.map.parent.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onMove, _this);
        }, this);
    };
    p.onMove = function (e) {
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
            egret.Tween.get(this.map.parent).to({ x: 0 }, 200);
            GameScene.mapOffsetX = 0;
        }
    };
    p.addconditionObserver = function (tempTaskCondition) {
        this.taskCondition.push(tempTaskCondition);
    };
    p.notify = function (id) {
        for (var _i = 0, _a = this.taskCondition; _i < _a.length; _i++) {
            var i = _a[_i];
            i.onchange(id);
            console.log("杀怪了");
        }
        //var task=TaskService.getIntance()._tasklist[id];
        //TaskService.getIntance().notify().
    };
    GameScene.mapOffsetX = 0;
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene',["EventEmitter"]);
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