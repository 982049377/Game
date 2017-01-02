var HeroBar = (function (_super) {
    __extends(HeroBar, _super);
    function HeroBar() {
        var _this = this;
        _super.call(this);
        this.gridX = 90;
        this.gridY = 120;
        this.gridOffset = 20;
        this.container = new egret.DisplayObjectContainer();
        //this.addChild(this.container);
        this.background = new egret.Bitmap();
        this.scaleX = 1.2;
        this.scaleY = 1.2;
        this.container.addChild(this.background);
        var returnButton = new egret.Bitmap();
        returnButton.texture = RES.getRes("return_png");
        tool.anch(returnButton);
        returnButton.x = 370;
        returnButton.y = 210;
        this.container.addChild(returnButton);
        returnButton.touchEnabled = true;
        returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(_this.container);
        }, this);
        this.inithero();
    }
    var d = __define,c=HeroBar,p=c.prototype;
    p.inithero = function () {
        this.grids = [];
        for (var i = 0; i < User.heroesInTeamLimit; i++) {
            var grid = new HeroGrid();
            this.grids.push(grid);
        }
        this.grids[0].x = this.gridX;
        this.grids[0].y = this.gridY;
        this.grids[0].scaleY = 1.8;
        this.grids[0].scaleX = 1.2;
        this.container.addChild(this.grids[0]);
        for (var i = 1; i < User.heroesInTeamLimit; i++) {
            this.grids[i].scaleY = 1.8;
            this.grids[i].scaleX = 1.2;
            this.grids[i].x = this.grids[i - 1].x + this.grids[i].width + this.gridOffset;
            this.grids[i].y = this.gridY;
            this.container.addChild(this.grids[i]);
        }
    };
    p.setInformation = function (user) {
        this.background.texture = RES.getRes("bg_png");
        for (var i = 0; i < User.heroesInTeamLimit; i++) {
            this.grids[i].call(user.heroesInTeam[i]);
        }
        for (var i = 0; i < User.heroesInTeamLimit; i++) {
            this.grids[i].Tap(user.heroesInTeam[i]);
        }
        this.addChild(this.container);
    };
    return HeroBar;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroBar,'HeroBar');
var HeroGrid = (function (_super) {
    __extends(HeroGrid, _super);
    function HeroGrid() {
        _super.call(this);
        this.border = new egret.Bitmap();
        this.addChild(this.border);
        this.contentBitmap = new egret.Bitmap();
        this.addChild(this.contentBitmap);
        this.border.texture = RES.getRes("Border_png");
        tool.anch(this.border);
    }
    var d = __define,c=HeroGrid,p=c.prototype;
    p.call = function (content) {
        if (content == null) {
            return;
        }
        this.content = content;
        this.contentBitmap.texture = content.properties._bitmap.texture;
        tool.anch(this.contentBitmap);
        var scale = this.border.texture.textureWidth / this.contentBitmap.texture.textureWidth;
        this.contentBitmap.scaleX = scale;
        this.contentBitmap.scaleY = scale;
        this.border.texture = RES.getRes("null_png");
    };
    p.Tap = function (hero) {
        var heroStatusBar = new HeroStatusBar();
        this.contentBitmap.touchEnabled = true;
        this.contentBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            heroStatusBar.setInformation(hero);
            GameManager.getInstance().UIManager.addLayer(LayerType.UILayer, heroStatusBar);
        }, this);
    };
    return HeroGrid;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroGrid,'HeroGrid');
//# sourceMappingURL=HeroBar.js.map