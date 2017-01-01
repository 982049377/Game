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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    //生成任务条件 
    p.creatTaskCondition = function (type) {
        var taskCondition = null;
        if (type == "NPCTalkTaskCondition")
            taskCondition = new NPCTalkTaskCondition();
        if (type == "KillMonsterTaskCondition")
            taskCondition = new KillMonsterTaskCondition();
        return taskCondition;
    };
    //生成任务
    p.creatTask = function (id) {
        var taskCondition = null;
        taskCondition = this.creatTaskCondition(Task.Task_LIST[id].TaskCondition);
        var task = new Task(id, Task.Task_LIST[id].name, Task.Task_LIST[id].dris, Task.Task_LIST[id].fromNPCid, Task.Task_LIST[id].toNPCid, Task.Task_LIST[id].total, taskCondition, Task.Task_LIST[id].toid);
        return task;
    };
    p.createGameScene = function () {
        var _this = this;
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var taskService = TaskService.getIntance();
        var task = this.creatTask("001");
        var task2 = this.creatTask("002");
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
        this.addChild(NPC1);
        this.addChild(NPC2);
        NPC1.x = 200;
        NPC1.y = 200;
        NPC2.x = 500;
        NPC2.y = 500;
        var TaskPanelLogo = new egret.Bitmap();
        TaskPanelLogo.texture = RES.getRes("TaskPanelLogo_png");
        TaskPanelLogo.x = 100;
        TaskPanelLogo.y = 900;
        TaskPanelLogo.scaleX = 0.5;
        TaskPanelLogo.scaleY = 0.5;
        this.addChild(TaskPanelLogo);
        TaskPanelLogo.touchEnabled = true;
        var taskPanel = new TaskPanel();
        TaskPanelLogo.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //var taskPanel=new TaskPanel();
            taskPanel.call();
            _this.addChild(taskPanel);
            taskPanel.x = 100;
            taskPanel.y = 600;
        }, this);
        var scene = new SceneService();
        var Monster = new egret.Bitmap();
        Monster.texture = RES.getRes("Monster_png");
        Monster.x = 400;
        Monster.y = 900;
        Monster.scaleX = 0.5;
        Monster.scaleY = 0.5;
        this.addChild(Monster);
        Monster.touchEnabled = true;
        Monster.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            scene.notify("002");
        }, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map