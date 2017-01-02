var Crystal = (function (_super) {
    __extends(Crystal, _super);
    function Crystal() {
        _super.call(this);
        this.tempid = 0;
        Crystal.Id++;
        this.tempid = Crystal.Id;
        this.properties = new Property();
        GameManager.getInstance().UIManager.addLayer(LayerType.UILayer, this.properties._bitmap);
        //this.addChild(this.properties._bitmap);
    }
    var d = __define,c=Crystal,p=c.prototype;
    p.getClassName = function () {
        return "Crystal";
    };
    p.getQualityDescript = function () {
        return crystalQualitySort[this.quality];
    };
    d(p, "Atk"
        ,function () {
            return this.properties.initialAtk;
        }
    );
    d(p, "Def"
        ,function () {
            return this.properties.initialDef;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = this.properties.initialAtk * 1.2 + this.properties.initialDef * 0.8;
            return result;
        }
    );
    p.setinformation = function (id, atk, def, name, bitmap) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
    };
    Crystal.Id = 0;
    return Crystal;
}(egret.DisplayObjectContainer));
egret.registerClass(Crystal,'Crystal',["Objectdetail"]);
//# sourceMappingURL=Crystal.js.map