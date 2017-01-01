var Walk = (function () {
    function Walk(pperson, walk) {
        this.Walkcount = -1;
        this.i = 0;
        this.person = pperson;
        this.Walklist = walk;
    }
    var d = __define,c=Walk,p=c.prototype;
    p.onEnter = function () {
        egret.startTick(this.PlayWalk, this);
        //           console.log("EnterWalk");
    };
    p.onExit = function () {
        egret.stopTick(this.PlayWalk, this);
    };
    p.PlayWalk = function () {
        this.Walkcount++;
        this.i++;
        if (this.Walkcount >= this.Walklist.length)
            this.Walkcount = 0;
        if (this.i == 10) {
            this.person._role.texture = RES.getRes(this.Walklist[this.Walkcount]);
            this.i = 0;
        }
        //  console.log("Walk");
        //  console.log(this.Walklist[this.Walkcount]);
        return true;
    };
    return Walk;
}());
egret.registerClass(Walk,'Walk',["State"]);
//# sourceMappingURL=Walk.js.map