//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    //public sssssss;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    //生成任务条件 
    private creatTaskCondition(type: string) {
        var taskCondition = null;
        if (type == "NPCTalkTaskCondition")
            taskCondition = new NPCTalkTaskCondition();
        if (type == "KillMonsterTaskCondition")
            taskCondition = new KillMonsterTaskCondition();
        return taskCondition;
    }

    //生成任务
    private creatTask(id: string): Task {
        var taskCondition = null;
        taskCondition = this.creatTaskCondition(Task.Task_LIST[id].TaskCondition);
        var task = new Task(id,
            Task.Task_LIST[id].name,
            Task.Task_LIST[id].dris,
            Task.Task_LIST[id].fromNPCid,
            Task.Task_LIST[id].toNPCid,
            Task.Task_LIST[id].total,
            taskCondition,
            Task.Task_LIST[id].toid);
        return task;
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    // private _player: Role;

    idlelist = ["Idle0_png", "Idle1_png", "Idle2_png", "Idle3_png"];
    walklist = ["10000_png", "10001_png", "10002_png", "10003_png", "10004_png", "10005_png", "10006_png", "10007_png"];
    private user: User;
    private _bg: TileMap;
    private _container: egret.DisplayObjectContainer;
    // private _grid:Grid;
    // private _path:Array<MapNode>=new Array;
    private createGameScene(): void {
        this._container = new egret.DisplayObjectContainer();
        var layoutController = LayoutController.getIntance();


        this._bg = new TileMap();
        this._container.addChild(this._bg);
        this._bg.Create();


        this.user = new User();
        this._container.addChild(this.user.container)
        this.user.setinformation("982049377",this.idlelist,this.walklist)

        this.addChild(this._container);

        this.walkByTap();
        this.mapMove();



        var guanyu = new Hero();
        var bitmap = this.createBitmapByName("001_png");
        guanyu.setinformation("001", "关羽", 95, 85, heroQualitySort.S, bitmap);
        this.user.addHero(guanyu);
        this.user.inToTeam(guanyu);
        var qinglongyanyuedao = new Equipment();
        bitmap = this.createBitmapByName("weapan001_png");
        qinglongyanyuedao.setinformation("we001", 10, 0, "青龙偃月刀", equipmentQualitySort.Story, bitmap);
        // var atkCrystal = new Crystal();
        // bitmap = this.createBitmapByName("atk001_png");
        // atkCrystal.setinformation("atk001", 5, 0, "攻击宝石", bitmap)
        // var defCrystal = new Crystal();
        // bitmap = this.createBitmapByName("def001_png");
        // defCrystal.setinformation("def001", 0, 5, "防御宝石", bitmap)

        guanyu.addEquipment(this.user, qinglongyanyuedao);
        //qinglongyanyuedao.addCrystal(this.user, atkCrystal);
        //qinglongyanyuedao.addCrystal(this.user, defCrystal);



        var taskService: TaskService = TaskService.getIntance();
        var task: Task = this.creatTask("001");
        var task2: Task = this.creatTask("002");
        taskService.addTask(task);
        taskService.addTask(task2);

        var NPC1 = new NPC("01");
        var NPC2 = new NPC("02");
        taskService.addObserver(NPC1);
        taskService.addObserver(NPC2);
        taskService.Canaccept("001");
        NPC1.call();
        NPC2.call();
        // taskService.accept(task.getid());

        this._container.addChild(NPC1);
        this._container.addChild(NPC2);
        NPC1.x = 580; NPC1.y = 400;
        NPC2.x = 870; NPC2.y = 800;

        var TaskPanelLogo: egret.Bitmap = new egret.Bitmap();
        TaskPanelLogo.texture = RES.getRes("TaskPanelLogo_png");
        TaskPanelLogo.x = 100;
        TaskPanelLogo.y = 500;
        TaskPanelLogo.scaleX = 0.5;
        TaskPanelLogo.scaleY = 0.5;
        this._container.addChild(TaskPanelLogo);

        TaskPanelLogo.touchEnabled = true;
        var taskPanel = new TaskPanel();
        TaskPanelLogo.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            //var taskPanel=new TaskPanel();
            taskPanel.call();
            this._container.addChild(taskPanel);
            taskPanel.x = 100;
            taskPanel.y = 600;
        }, this);

        var scene: SceneService = new SceneService();

        var Monster: egret.Bitmap = new egret.Bitmap();
        Monster.texture = RES.getRes("Monster_png");
        Monster.x = 400;
        Monster.y = 900;
        Monster.scaleX = 0.5;
        Monster.scaleY = 0.5;
        this._container.addChild(Monster);

        Monster.touchEnabled = true;
        Monster.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            scene.notify("002");
        }, this);



        this.addChild(layoutController);

    }
    /***
     * 不合理的地方AStar和地图耦合性强，只能在main里面调用
     * 虽然用了UI层级管理器但监听还是很恶心
     * hero打开hero状态面板和后面的装备打开装备面板相同，就没做了
     */

    private mapMove() {
        /***地图 */

        this._container.touchEnabled = true;
        this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            this.prevX = e.stageX;
            //this.offsetx=e.stageX-this._bg.x;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this)
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        }, this)
    }

    private walkByTap() {

        var idle: Idle = new Idle(this.user.role, this.idlelist);
        var walk: Walk = new Walk(this.user.role, this.walklist);
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
            this.setAstar();
            this._bg._astar.setStartNode(Math.floor((this.user.role.x) / 100), Math.floor(this.user.role.y / 100));
            //this._bg._astar.setStartNode(Math.floor(this._player.x/100),Math.floor(this._player.y/100));
            //this._bg._astar.setEndNode(Math.floor(evt.stageX/100),Math.floor(evt.stageY/100));
            this._bg._astar.setEndNode(Math.floor((evt.stageX + this.map_Grid) / 100), Math.floor(evt.stageY / 100));
            var i = this._bg._astar.findPath();
            if (i == 1) {
                this.user.role.SetState(walk)
                //egret.Tween.removeTweens(this._player);
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.onEnterFrame;
                //this.Move();
                i = 2
            }
            else
                if (i == 0) {
                    this.user.role.SetState(idle);
                    this.setAstar();
                    i = 2;
                }
                else
                    if (i == -1) {
                        this.user.role.SetState(idle);
                        this.setAstar();
                        i = 2;
                    }
        }, this);
        egret.startTick((): boolean => {
            if (this._bg._astar._path[0] != null) {
                if (this.user.role.x == (this._bg._astar._path[0].x) * this._bg.MapSize + 50 && this.user.role.y == this._bg._astar._path[0].y * this._bg.MapSize + 50) {
                    this.user.role.SetState(idle);
                    //this.setAstar(); 
                }
            }
            return false;
        }, this);
    }
    private prevX: number = 0;
    private map_Grid = 0;
    private offsetx: number;
    private onMove(e: egret.TouchEvent) {
        //this._bg.x+=offsetx;
        //console.log("onMove");
        this.offsetx = this.prevX - e.stageX;
        if (this.offsetx > 0) {
            egret.Tween.get(this._container).to({ x: -360 }, 200);
            this.map_Grid = 360;
        }
        if (this.offsetx < 0) {
            //console.log("12345789465413213212313");
            egret.Tween.get(this._container).to({ x: 0 }, 200)
            this.map_Grid = 0;
        }
    }

    /**帧事件' */
    private step: number = 10;
    private i = 2;
    private onEnterFrame(event: egret.Event): void {
        //console.log('hi');
        var n = this._bg._astar._path.length;
        //console.log(n - this.i);
        if (n - this.i < 0)
            return;
        var targetX: number = this._bg._astar._path[n - this.i].x * this._bg.MapSize + this._bg.MapSize / 2;
        var targetY: number = this._bg._astar._path[n - this.i].y * this._bg.MapSize + this._bg.MapSize / 2;
        var dx: number = targetX - this.user.role.x;
        var dy: number = targetY - this.user.role.y;
        var dist: number = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.step * 2) {
            this.i++;
            if (this.i > this._bg._astar._path.length) {
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
            //this._player.Move(new Vector2(targetX, targetY), this.inputPos);
        }
        // console.log("targetX:"+targetX+"targetY:"+targetY);
        // console.log("person.x:"+this._player.x+"person.y:"+this._player.y); 
        // console.log("dx:"+dx+"dy:"+dy); 
    }

    private setAstar(): void {
        egret.Tween.removeTweens(this.user.role);
        this._bg._astar.setStartNode(Math.floor(this.user.role.x / 100), Math.floor(this.user.role.y / 100));
        this._bg._astar.empty();
        this.i = 1;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        var self: any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr: Array<Array<egret.ITextElement>> = [];
        for (var i: number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change: Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }

}
 /*
class ss{
    public ssss(e:Main){
        e.sssssss;
    }
}*/