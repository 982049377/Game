var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id) {
        _super.call(this);
        this._tasklist = [];
        this.NPCField = new egret.DisplayObjectContainer();
        this._id = id;
        //NPC形象加载  图片格式有要求305*280；
        this._role = new Role();
        this._role.call(this.CreatNPC(id), this.CreatNPC(id));
        this._role.x = 170;
        this._role.y = 170;
        this.NPCField.addChild(this._role);
        this.NPCField.width = this._role.width;
        this.NPCField.height = this._role.height;
        this._name = NPC.NPC_LIST[id].name;
        //NPC头上任务反馈
        this.taskresponse = new egret.Bitmap();
        this.taskresponse.scaleX = 0.5;
        this.taskresponse.scaleY = 0.5;
        this.taskresponse.x = -50;
        this.taskresponse.y = -180;
        this.NPCField.addChild(this.taskresponse);
        //namelabel相关设置
        this.namelabel = new egret.TextField();
        this.namelabel.x = -30;
        this.namelabel.y = 70;
        this.namelabel.$setTextColor(0X00000);
        this.namelabel.size = 40;
        this.NPCField.addChild(this.namelabel);
        this.addChild(this.NPCField);
    }
    var d = __define,c=NPC,p=c.prototype;
    //调用函数
    p.call = function () {
        this.namelabel.text = this._name;
        this.getTask();
        this.responseTask();
        this.onNPCclick();
    };
    //鼠标点击
    p.onNPCclick = function () {
        var _this = this;
        this._role.touchEnabled = true;
        this._role.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // this.getTask();
            // this.responseTask();
            var task = _this.getOptimalTask();
            var fromself = false;
            var toself = false;
            if (task.getfromNpcId() == _this._id)
                fromself = true;
            if (task.gettoNpcId() == _this._id)
                toself = true;
            var dialogue = new DialoguePanel();
            dialogue.anchorOffsetX = dialogue.width / 2;
            dialogue.anchorOffsetY = dialogue.height / 2;
            dialogue.x = _this.parent.stage.width / 2 - _this.x;
            dialogue.y = _this.parent.stage.height / 2 - _this.y;
            dialogue.call(task, fromself, toself);
            _this.addChild(dialogue);
            _this.getTask();
            _this.responseTask();
        }, this);
    };
    p.getOptimalTask = function () {
        var task;
        for (var s = 0; s < this._tasklist.length; s++) {
            //优先查找自己能结算的任务
            if (this._tasklist[s].gettoNpcId() == this._id) {
                switch (this._tasklist[s].getstatus()) {
                    case statusType.Unacceptable:
                        break;
                    case statusType.Acceptable:
                        break;
                    case statusType.Cancomplete:
                        task = this._tasklist[s];
                        //console.log("结算");
                        break;
                    case statusType.Complete:
                        //task=this._tasklist[s];
                        break;
                    case statusType.Working:
                        //task=this._tasklist[s];
                        break;
                }
            }
        }
        if (task == null) {
            for (var s = 0; s < this._tasklist.length; s++) {
                //次选查找自己能发送的任务
                if (this._tasklist[s].getfromNpcId() == this._id) {
                    switch (this._tasklist[s].getstatus()) {
                        case statusType.Unacceptable:
                            break;
                        case statusType.Acceptable:
                            task = this._tasklist[s];
                            console.log("提交");
                            break;
                        case statusType.Cancomplete:
                            break;
                        case statusType.Complete:
                            break;
                        case statusType.Working:
                            break;
                    }
                }
            }
        }
        //身上既没有能发出的任务也没有能结算的任务，随意一个任务
        if (task == null) {
            task = this._tasklist[0];
        }
        return task;
    };
    p.CreatNPC = function (id) {
        var Animationlist = [];
        for (var s = 0; s < NPC.NPC_LIST[id].Flashlist; s++) {
            if (s < 10)
                Animationlist.push("NPC" + id + "_0" + s + "" + "_png");
            if (s > 10)
                Animationlist.push("NPC" + id + "_" + s + "" + "_png");
        }
        return Animationlist;
    };
    p.getTask = function () {
        var _this = this;
        var NPCRule = function (tasklist) {
            var temptasklist = [];
            for (var id in tasklist) {
                var task = tasklist[id];
                if (task.gettoNpcId() == _this._id) {
                    temptasklist.push(task);
                }
                if (task.getfromNpcId() == _this._id) {
                    temptasklist.push(task);
                }
            }
            return temptasklist;
        };
        this._tasklist = TaskService.getIntance().getTaskByCustomRule(NPCRule);
    };
    p.onchange = function (task) {
        // for(var s of this._tasklist){
        //     if(s.getid()==task.getid()){
        //         if(s.getfromNpcId() == this._id)
        //             console.log(this._name+":发出任务");
        //         if(s.gettoNpcId() == this._id)
        //             console.log(this._name+":完成任务");
        //     }
        // }
        this.getTask();
        this.responseTask();
    };
    // public addTask(task:Task){
    //     this._tasklist.push(task);
    // }
    //是否身上有未发出的任务
    p.hasSendTask = function () {
        for (var _i = 0, _a = this._tasklist; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.getfromNpcId() == this._id && s.getstatus() == statusType.Acceptable) {
                return true;
            }
        }
        return false;
    };
    //是否身上有未提交的任务
    p.hasReceiveTask = function () {
        for (var _i = 0, _a = this._tasklist; _i < _a.length; _i++) {
            var s = _a[_i];
            // if(s.gettoNpcId()==this._id && s.getstatus()==statusType.Working){
            //    return true;
            // }
            if (s.gettoNpcId() == this._id && s.getstatus() == statusType.Cancomplete) {
                return true;
            }
        }
        return false;
    };
    p.responseTask = function () {
        /**缺最优算法 */
        var s = this.getOptimalTask();
        //任务发出不可接受，没有表情
        if (s.getstatus() == statusType.Unacceptable) {
            this.taskresponse.texture = RES.getRes("0_png");
        }
        //任务发出可接受，蓝色问号
        if (s.getfromNpcId() == this._id && s.getstatus() == statusType.Acceptable) {
            this.taskresponse.texture = RES.getRes("1_png");
        }
        //任务进行中，灰色问号
        if (s.gettoNpcId() == this._id && s.getstatus() == statusType.Working) {
            this.taskresponse.texture = RES.getRes("2_png");
        }
        //任务可完成但没提交，金色问号
        if (s.gettoNpcId() == this._id && s.getstatus() == statusType.Cancomplete) {
            this.taskresponse.texture = RES.getRes("3_png");
        }
        //任务提交完成，没有表情
        if (s.gettoNpcId() == this._id && s.getstatus() == statusType.Complete) {
            this.taskresponse.texture = RES.getRes("0_png");
        }
        if (!this.hasSendTask() && !this.hasReceiveTask())
            this.taskresponse.texture = RES.getRes("0_png");
    };
    NPC.NPC_LIST = {
        "01": { name: "甘宁", Flashlist: 6 },
        "02": { name: "陆逊", Flashlist: 4 } //陆逊
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map