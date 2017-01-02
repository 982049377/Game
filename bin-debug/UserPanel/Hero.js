var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyName, desc) {
    var getter = desc.get;
    desc.get = function () {
        //console.log(target);//引用时的类
        //console.log(propertyName)//接下来的函数
        //console.log(this);
        if (this["fightHeroPowerCache"] != null && !this["flag"]) {
            return this["fightHeroPowerCache"];
        }
        else {
            this["fightHeroPowerCache"] = getter.apply(this);
        }
        //console.log(this["fightHeroPowerCache"]);
        return this["fightHeroPowerCache"];
    };
    return desc;
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        this.level = 0;
        this.physique = 0; //体质
        this.equipmentCurrent = 0;
        // get Atk() {
        //     var result = 0;
        //     this.equipments.forEach(equipment => result += equipment.Atk)
        //     return result;
        // }
        this._cacheHeroFightPower = 0;
        this.flag = false;
        this.tempid = 0;
        this.exp = new Bignumber();
        this.isInTeam = false;
        this.equipments = [];
        Hero.Id++;
        this.properties = new Property();
        this.tempid = Hero.Id;
        //LayoutController.getIntance().addLayer(LayerType.UILayer, this.properties._bitmap);
        this.addChild(this.properties._bitmap);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.getClassName = function () { return "Hero"; };
    p.getQualityDescript = function () { return heroQualitySort[this.quality]; };
    d(p, "maxHP"
        // getAtkDiscript(){return this.properties.atkDiscript;}
        // getDefDiscript(){return this.properties.defDiscript;}
        ,function () {
            var maxhp;
            switch (this.quality) {
                case heroQualitySort.A:
                    maxhp = this.physique * 0.7;
                    break;
                case heroQualitySort.B:
                    maxhp = this.physique * 0.6;
                    break;
                case heroQualitySort.C:
                    maxhp = this.physique * 0.5;
                    break;
                case heroQualitySort.S:
                    maxhp = this.physique * 0.8;
                    break;
            }
            return maxhp;
        }
    );
    d(p, "Atk"
        ,function () {
            var atk = 0;
            switch (this.quality) {
                case heroQualitySort.A:
                    atk = this.properties.initialAtk + this.level * 0.7;
                    break;
                case heroQualitySort.B:
                    atk = this.properties.initialAtk + this.level * 0.6;
                    break;
                case heroQualitySort.C:
                    atk = this.properties.initialAtk + this.level * 0.5;
                    break;
                case heroQualitySort.S:
                    atk = this.properties.initialAtk + this.level * 0.8;
                    break;
            }
            this.equipments.forEach(function (equipment) { return atk += equipment.Atk; });
            return atk;
        }
    );
    d(p, "Def"
        ,function () {
            var def = 0;
            switch (this.quality) {
                case heroQualitySort.A:
                    def = this.properties.initialDef + this.level * 0.7;
                    break;
                case heroQualitySort.B:
                    def = this.properties.initialDef + this.level * 0.6;
                    break;
                case heroQualitySort.C:
                    def = this.properties.initialDef + this.level * 0.5;
                    break;
                case heroQualitySort.S:
                    def = this.properties.initialDef + this.level * 0.8;
                    break;
            }
            this.equipments.forEach(function (equipment) { return def += equipment.Def; });
            return def;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = this.Atk * 1.2 + this.Def * 0.8; //攻击防御已经计算到hero中了
            return result;
        }
    );
    p.setinformation = function (id, name, atk, def, quality, bitmap) {
        var _this = this;
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
        this.name = name;
        this.quality = quality;
        this.properties._bitmap.touchEnabled = true;
        var heroStatusBar = new HeroStatusBar();
        this.properties._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            heroStatusBar.setInformation(_this);
            heroStatusBar.x = 100;
            heroStatusBar.y = 100;
            GameManager.getInstance().UIManager.addLayer(LayerType.UILayer, heroStatusBar);
            //console.log("点击人物");
            //this.addChild(heroBar);
            //this.swapChildren(heroBar,this._bitmap);
        }, this);
    };
    p.addEquipment = function (user, equipment) {
        if (this.equipmentCurrent < Hero.equipmentLimit) {
            this.equipments.push(equipment);
            user.flag = true;
            this.flag = true;
            this.equipmentCurrent++;
        }
        else {
            console.error("装备超过上限");
        }
    };
    p.removeEquipment = function (user, equipment) {
        if (this.equipmentCurrent <= 0)
            console.error("没有装备可以卸载");
        else {
            var index = this.equipments.indexOf(equipment);
            this.equipments.splice(index);
            user.flag = true;
            this.flag = true;
        }
    };
    Hero.Id = 0;
    Hero.equipmentLimit = 5;
    __decorate([
        Cache
    ], p, "fightPower", null);
    return Hero;
}(egret.DisplayObjectContainer));
egret.registerClass(Hero,'Hero',["Objectdetail"]);
//# sourceMappingURL=Hero.js.map