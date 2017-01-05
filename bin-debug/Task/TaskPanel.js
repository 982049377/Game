var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        _super.call(this);
        this._tasklist = [];
        this._textfield = new egret.TextField();
        this._textfield.x = 20;
        this._textfield.y = 40;
        this._textfield.width = 360;
        this._textfield.height = 200;
        this._returnButton = new egret.Bitmap();
        this._returnButton.anchorOffsetX = this._returnButton.width / 2;
        this._returnButton.anchorOffsetY = this._returnButton.height / 2;
        this._returnButton.scaleX = 0.4;
        this._returnButton.scaleY = 0.4;
        this._returnButton.x = 160;
        this._returnButton.y = 230;
        this._background = new egret.Bitmap();
        this._background.width = 400;
        this._background.height = 280;
        this._container = new egret.DisplayObjectContainer();
        this._container.width = this._background.width;
        this._container.height = this._background.height;
        this._container.addChild(this._background);
        this._container.addChild(this._returnButton);
        this._container.addChild(this._textfield);
        //this.addChild(this._container);
        this.getTask();
        this.returnButtonListener();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.call = function () {
        this.addChild(this._container);
        this.getTask();
        //var str="001";
        //TaskService.getIntance().Canfinish(str);
        this._textfield.text = this.getText();
        this._background.texture = RES.getRes("TaskPanelbg_png");
        this._returnButton.texture = RES.getRes(DialoguePanel.texturelist["退出"]);
        console.log("TaskPanel.call");
    };
    p.returnButtonListener = function () {
        var _this = this;
        this._returnButton.touchEnabled = true;
        this._returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("removeChild");
            _this.removeChild(_this._container);
            //this.parent.removeChild(this);
        }, this);
    };
    p.getText = function () {
        var str = "";
        for (var _i = 0, _a = this._tasklist; _i < _a.length; _i++) {
            var task = _a[_i];
            str += task.getname() + "      ";
            if (task.getstatus() == statusType.Working)
                str += "执行中\n";
            if (task.getstatus() == statusType.Cancomplete)
                str += "可完成\n";
        }
        return str;
    };
    p.onchange = function (task) {
        for (var _i = 0, _a = this._tasklist; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.getfromNpcId == task.getfromNpcId)
                console.log(this + "发出任务");
            if (s.gettoNpcId == task.gettoNpcId)
                console.log(this + "完成任务");
        }
    };
    p.getTask = function () {
        var NPCRule = function (tasklist) {
            var temptasklist = [];
            for (var id in tasklist) {
                var task = tasklist[id];
                if (task.getstatus() == statusType.Working) {
                    temptasklist.push(task);
                }
                if (task.getstatus() == statusType.Cancomplete) {
                    temptasklist.push(task);
                }
            }
            return temptasklist;
        };
        this._tasklist = TaskService.getIntance().getTaskByCustomRule(NPCRule);
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map