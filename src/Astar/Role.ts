class Role extends egret.DisplayObjectContainer {
    public _role: egret.Bitmap = new egret.Bitmap();
    private _State: State;
    public constructor() {
        super();
    }
    public SetState(e: State) {
        if (this._State != e) {
            this._State.onExit();
        }
        this._State = e;
        this._State.onEnter();
    }
    public firstCreat() {
        this._role = tool.createBitmapByName("10000_png")
        tool.anch(this._role);
        this.addChild(this._role);

        var idle: Idle = new Idle(this);
        this._State = idle;
        this._State.onEnter();


        // var i = tool.createBitmapByName("10000_png")
        // this.addChild(i);

    }
}