var LayerType;
(function (LayerType) {
    LayerType[LayerType["UILayer"] = 0] = "UILayer";
    LayerType[LayerType["DetailLayer"] = 1] = "DetailLayer";
})(LayerType || (LayerType = {}));
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        _super.call(this);
        this.UILayer = new egret.DisplayObjectContainer();
        this.DetailLayer = new egret.DisplayObjectContainer();
        this.addChild(this.UILayer);
        this.addChild(this.DetailLayer);
    }
    var d = __define,c=UIManager,p=c.prototype;
    p.addLayer = function (whichType, addWhat) {
        switch (whichType) {
            case LayerType.DetailLayer:
                this.DetailLayer.addChild(addWhat);
                addWhat.x = GameScene.mapOffsetX;
                break;
            case LayerType.UILayer:
                this.UILayer.addChild(addWhat);
                addWhat.x = GameScene.mapOffsetX;
                break;
        }
    };
    p.removeLayer = function (whichType, addWhat) {
        switch (whichType) {
            case LayerType.DetailLayer:
                this.DetailLayer.addChild(addWhat);
                this.DetailLayer.removeChild(addWhat);
                break;
            case LayerType.UILayer:
                this.UILayer.addChild(addWhat);
                this.UILayer.removeChild(addWhat);
                break;
        }
    };
    p.switchIndex = function (swithchFrom, switchTo) {
        //this.swapChildren(LayerType,)
        var from = this.find(swithchFrom);
        var to = this.find(switchTo);
        this.swapChildren(from, to);
    };
    p.find = function (temp) {
        var container = new egret.DisplayObjectContainer();
        switch (temp) {
            case LayerType.DetailLayer:
                container = this.DetailLayer;
                break;
            case LayerType.UILayer:
                container = this.UILayer;
                break;
        }
        return container;
    };
    return UIManager;
}(egret.DisplayObjectContainer));
egret.registerClass(UIManager,'UIManager');
//# sourceMappingURL=UIManager.js.map