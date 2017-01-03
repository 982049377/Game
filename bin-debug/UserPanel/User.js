var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
var Check = function (target, propertyName, desc) {
    console.log(target);
    console.log(propertyName);
    console.log(desc);
    var getter = desc.value;
    console.log("desc.get" + desc.get);
    console.log("desc.set" + desc.set);
    return getter.apply(_this);
    //return target["inToTeam(hero: Hero)"];
    //return desc;
};
var User = (function () {
    function User() {
        this.level = 0;
        this.gold = 0;
        this._cacheFightPower = 0;
        this.flag = false;
        User.count++;
        if (User.count > 1)
            throw 'singleton!!';
        this.container = new egret.DisplayObjectContainer();
        this.role = new Role();
        this.id = "";
        this.exp = new Bignumber();
        this.cash = new Bignumber();
        this.heros = [];
        this.container.addChild(this.role);
    }
    var d = __define,c=User,p=c.prototype;
    User.getInstance = function () {
        if (this.instance == null)
            this.instance = new User();
        return this.instance;
    };
    d(p, "heroesInTeam"
        ,function () {
            return this.heros.filter(function (hero) { return hero.isInTeam; });
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.heroesInTeam.forEach(function (hero) { return result += hero.fightPower; });
            this._cacheFightPower = result;
            this.flag = false;
            return this._cacheFightPower;
        }
    );
    p.setinformation = function (id, idlelist, walklist) {
        this.id = id;
        this.role.x = 0;
        this.role.y = 200;
        this.role.scaleX = 0.8;
        this.role.scaleY = 0.8;
        //this.addChild(this.role);
        this.role.call(idlelist, walklist);
        //console.log(this.role._role.texture);
        this.tapRole();
    };
    p.tapRole = function () {
        var _this = this;
        var heroBar = new HeroBar();
        this.role._role.touchEnabled = true;
        this.role._role.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            heroBar.setInformation(_this);
            //this.container.addChild(heroBar);
            GameManager.getInstance().UIManager.addLayer(LayerType.UILayer, heroBar);
        }, this);
    };
    p.addHero = function (hero) {
        this.heros.push(hero);
    };
    //@Check
    p.inToTeam = function (hero) {
        if (this.checkHero(hero)) {
            var i = this.heros.indexOf(hero);
            this.heros[i].isInTeam == true;
            if (this.heros[i].isInTeam == true) {
                console.warn(hero.name + "已经上阵");
                return;
            }
            else {
                this.heros[i].isInTeam = true;
            }
            this.flag = true;
        }
    };
    //@Check
    p.checkHero = function (hero) {
        if (this.heros.filter(function (temphero) { return (temphero.properties.configId == hero.properties.configId) && (temphero.properties.identityID == hero.properties.identityID); })) {
            return true;
        }
        return false;
    };
    p.outToTean = function (hero) {
        if (this.checkHero(hero)) {
            if (hero.isInTeam == false) {
                console.warn(hero.name + "没有上阵");
                return;
            }
            else {
                hero.isInTeam = false;
            }
            this.flag = true;
        }
    };
    User.heroesInTeamLimit = 5;
    User.idlelist = ["Idle0_png", "Idle1_png", "Idle2_png", "Idle3_png"];
    User.walklist = ["10000_png", "10001_png", "10002_png", "10003_png", "10004_png", "10005_png", "10006_png", "10007_png"];
    User.count = 0;
    __decorate([
        Cache
    ], p, "fightPower", null);
    return User;
}());
egret.registerClass(User,'User');
//# sourceMappingURL=User.js.map