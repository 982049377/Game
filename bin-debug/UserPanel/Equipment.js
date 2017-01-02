var Equipment = (function (_super) {
    __extends(Equipment, _super);
    function Equipment() {
        _super.call(this);
        this.crystalsCurrent = 0;
        this.tempid = 0;
        this.crystals = [];
        Equipment.Id++;
        this.tempid = Equipment.Id;
        this.properties = new Property();
        GameManager.getInstance().UIManager.addLayer(LayerType.UILayer, this.properties._bitmap);
        // this.addChild(this.properties._bitmap);
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.getClassName = function () {
        return "Equipment";
    };
    p.getQualityDescript = function () {
        return equipmentQualitySort[this.quality];
    };
    d(p, "Atk"
        ,function () {
            var result = 0;
            this.crystals.forEach(function (crystal) { return result += crystal.Atk; });
            switch (this.quality) {
                case equipmentQualitySort.Common:
                    result = result * 0.8;
                    break;
                case equipmentQualitySort.Rare:
                    result = result * 0.9;
                    break;
                case equipmentQualitySort.Epic:
                    result = result * 1.0;
                    break;
                case equipmentQualitySort.Story:
                    result = result * 1.2;
                    break;
            }
            result += this.properties.initialAtk;
            return result;
        }
    );
    d(p, "Def"
        ,function () {
            var result = 0;
            this.crystals.forEach(function (crystal) { return result += crystal.Def; });
            switch (this.quality) {
                case equipmentQualitySort.Common:
                    result = result * 0.8;
                    break;
                case equipmentQualitySort.Rare:
                    result = result * 0.9;
                    break;
                case equipmentQualitySort.Epic:
                    result = result * 1.0;
                    break;
                case equipmentQualitySort.Story:
                    result = result * 1.2;
                    break;
            }
            result += this.properties.initialDef;
            return result;
        }
    );
    d(p, "fightPower"
        // private _cacheEquipmentFightPower = 0;
        ,function () {
            var result = this.Atk * 1.2 + this.Def * 0.8;
            return result;
        }
    );
    p.setinformation = function (id, atk, def, name, quality, bitmap) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
        this.quality = quality;
    };
    p.addCrystal = function (user, crystal) {
        if (this.crystalsCurrent > Equipment.crystalsLimit)
            console.error("宝石超过上限，不能镶嵌");
        else {
            this.crystals.push(crystal);
            user.flag = true;
            this.crystalsCurrent++;
        }
    };
    p.removeCrystal = function (user, crystal) {
        if (this.crystalsCurrent < 0)
            console.error(this.properties.name + "没有宝石，不能卸载");
        else {
            var index = this.crystals.indexOf(crystal);
            this.crystals.splice(index);
            user.flag = true;
            this.crystalsCurrent--;
        }
    };
    Equipment.Id = 0;
    Equipment.crystalsLimit = 5;
    return Equipment;
}(egret.DisplayObjectContainer));
egret.registerClass(Equipment,'Equipment',["Objectdetail"]);
//# sourceMappingURL=Equipment.js.map