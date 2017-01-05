var TaskService = (function () {
    function TaskService() {
        //private _tasklist:Task[]=[];
        this._observerlist = [];
        this._tasklist = {};
        TaskService.count++;
        if (TaskService.count > 1)
            throw 'singleton!!';
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getIntance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.getTaskByCustomRule = function (Rule) {
        return Rule(this._tasklist);
    };
    p.addTask = function (task) {
        this._tasklist[task.getid()] = task;
    };
    p.addObserver = function (observer) {
        this._observerlist.push(observer);
    };
    p.finish = function (id) {
        if (this._tasklist[id] == null) {
            throw '没有这个任务';
        }
        if (this._tasklist[id].getstatus() == statusType.Cancomplete) {
            this._tasklist[id].finish();
            this.notify(id);
        }
    };
    p.accept = function (id) {
        if (this._tasklist[id] == null) {
            throw '没有这个任务';
        }
        if (this._tasklist[id].getstatus() == statusType.Acceptable) {
            this._tasklist[id].accept();
            this.notify(id);
        }
    };
    p.Canaccept = function (id) {
        if (this._tasklist[id] == null) {
            throw '没有这个任务';
        }
        //if(this._tasklist[id].getstatus()==statusType.Unacceptable){
        this._tasklist[id].Canaccept();
        this.notify(id);
        //}
    };
    p.Canfinish = function (id) {
        if (this._tasklist[id] == null) {
            throw '没有这个任务';
        }
        if (this._tasklist[id].getstatus() == statusType.Working) {
            this._tasklist[id].Canfinish();
            this.notify(id);
        }
    };
    p.notify = function (id) {
        for (var _i = 0, _a = this._observerlist; _i < _a.length; _i++) {
            var s = _a[_i];
            s.onchange(this._tasklist[id]);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map