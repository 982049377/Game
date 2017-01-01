var Check: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    console.log(target);
    console.log(propertyName);
    console.log(desc);
    const getter = desc.value;

    console.log("desc.get" + desc.get);
    console.log("desc.set" + desc.set);
    return getter.apply(this);
    //return target["inToTeam(hero: Hero)"];
    //return desc;
}



class User {
    id: string;
    level: number = 0;
    exp: Bignumber;
    gold: number = 0;
    cash: Bignumber;
    heros: Hero[];
    static heroesInTeamLimit = 5;
    role: Role;
    container: egret.DisplayObjectContainer;
    constructor() {
        this.container = new egret.DisplayObjectContainer();

        this.role = new Role();
        this.id = "";
        this.exp = new Bignumber();
        this.cash = new Bignumber();
        this.heros = [];
        this.container.addChild(this.role);

    }
    get heroesInTeam() {
        return this.heros.filter(hero => hero.isInTeam)
    }
    private _cacheFightPower = 0;
    public flag: boolean = false;
    @Cache
    get fightPower() {
        var result = 0;
        this.heroesInTeam.forEach(hero => result += hero.fightPower);
        this._cacheFightPower = result;
        this.flag = false;
        return this._cacheFightPower;
    }

    setinformation(id: string, idlelist: string[], walklist: string[]) {
        this.id = id;
        this.role.x = 0;
        this.role.y = 200;
        this.role.scaleX = 0.8;
        this.role.scaleY = 0.8;
        //this.addChild(this.role);
        this.role.call(idlelist, walklist);
        //console.log(this.role._role.texture);
        this.tapRole();
    }

    private tapRole() {
        var heroBar = new HeroBar();
        this.role._role.touchEnabled = true;
        this.role._role.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            heroBar.setInformation(this);
            this.container.addChild(heroBar);
        }, this)
    }

    addHero(hero: Hero) {
        this.heros.push(hero);
    }
    //@Check
    inToTeam(hero: Hero) {
        if (this.checkHero(hero)) {
            var i = this.heros.indexOf(hero);
            this.heros[i].isInTeam == true;
            if (this.heros[i].isInTeam == true) {
                console.warn(hero.name + "已经上阵");
                return;
            } else {
                this.heros[i].isInTeam = true;
            }
            this.flag = true;
        }
    }
    //@Check
    checkHero(hero: Hero) {
        if (this.heros.filter(temphero => (temphero.properties.configId == hero.properties.configId) && (temphero.properties.identityID == hero.properties.identityID))) {
            return true;
        }
        return false;
    }
    outToTean(hero: Hero) {
        if (this.checkHero(hero)) {
            if (hero.isInTeam == false) {
                console.warn(hero.name + "没有上阵");
                return;
            } else {
                hero.isInTeam = false;
            }
            this.flag = true;
        }
    }
    /***
     * walk和idle动画
     * 点击寻路
     */


    private walkByTap() {

        var idle: Idle = new Idle(this.user.role, this.idlelist);
        var walk: Walk = new Walk(this.user.role, this.walklist);
        this.touchEnabled = true;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
            this.setAstar();
            this._bg._astar.setStartNode(Math.floor((this.user.role.x) / 100), Math.floor(this.user.role.y / 100));
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
                    this.role.SetState(idle);
                    this.setAstar();
                    i = 2;
                }
                else
                    if (i == -1) {
                        this.role.SetState(idle);
                        this.setAstar();
                        i = 2;
                    }
        }, this);
        egret.startTick((): boolean => {
            if (GameScene.getCurrentamap._astar._path[0] != null) {
                if (this.role.x == (this._bg._astar._path[0].x) * this._bg.MapSize + 50 && this.user.role.y == this._bg._astar._path[0].y * this._bg.MapSize + 50) {
                    this.role.SetState(idle);
                    //this.setAstar(); 
                }
            }
            return false;
        }, this);
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
        var dx: number = targetX - this.role.x;
        var dy: number = targetY - this.role.y;
        var dist: number = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.step * 2) {
            this.i++;
            if (this.i > this._bg._astar._path.length) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                //console.log('remove');
            }
        }
        else {
            if (targetX - this.role.x > this.step)
                this.role.x += this.step;
            if (targetY - this.role.y > this.step)
                this.role.y += this.step;
            if (this.role.x - targetX > this.step)
                this.role.x -= this.step;
            if (this.role.y - targetY > this.step)
                this.role.y -= this.step;
            if (Math.abs(this.role.x - targetX) <= this.step) {
                this.role.x = targetX;
            }
            if (Math.abs(this.role.y - targetY) <= this.step) {
                this.role.y = targetY;
            }
        }
    }

    private setAstar(): void {
        egret.Tween.removeTweens(this.user.role);
        this._bg._astar.setStartNode(Math.floor(this.user.role.x / 100), Math.floor(this.user.role.y / 100));
        this._bg._astar.empty();
        this.i = 1;
    }
}
