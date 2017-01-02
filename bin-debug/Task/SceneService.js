var SceneService = (function () {
    function SceneService() {
    }
    var d = __define,c=SceneService,p=c.prototype;
    p.addObserver = function (observer) {
    };
    p.notify = function (id) {
        //var task=TaskService.getIntance()._tasklist[id];
        TaskService.getIntance().finish(id);
    };
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService',["EventEmitter"]);
//# sourceMappingURL=SceneService.js.map