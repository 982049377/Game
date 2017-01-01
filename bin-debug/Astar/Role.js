var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
        this._role = new egret.Bitmap();
    }
    var d = __define,c=Role,p=c.prototype;
    p.SetState = function (e) {
        if (this._State != e) {
            this._State.onExit();
        }
        this._State = e;
        this._State.onEnter();
    };
    p.firstCreat = function () {
        this._role = tool.createBitmapByName("10000_png");
        tool.anch(this._role);
        this.addChild(this._role);
        var idle = new Idle(this);
        this._State = idle;
        this._State.onEnter();
        // var i = tool.createBitmapByName("10000_png")
        // this.addChild(i);
    };
    return Role;
}(egret.DisplayObjectContainer));
egret.registerClass(Role,'Role');
//# sourceMappingURL=Role.js.map