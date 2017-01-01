
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/Astar/Astar.js",
	"bin-debug/Astar/Grid.js",
	"bin-debug/Astar/Idle.js",
	"bin-debug/Astar/NPC.js",
	"bin-debug/Astar/Role.js",
	"bin-debug/Astar/State.js",
	"bin-debug/Astar/Task.js",
	"bin-debug/Astar/TaskService.js",
	"bin-debug/Astar/TileMap.js",
	"bin-debug/Astar/Walk.js",
	"bin-debug/HeroBar.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/UserPanel/Bignumber.js",
	"bin-debug/UserPanel/Crystal.js",
	"bin-debug/UserPanel/Details.js",
	"bin-debug/UserPanel/enum.js",
	"bin-debug/UserPanel/Equipment.js",
	"bin-debug/UserPanel/Hero.js",
	"bin-debug/UserPanel/HeroStatusBar.js",
	"bin-debug/UserPanel/LayoutController.js",
	"bin-debug/UserPanel/Objectdetail.js",
	"bin-debug/UserPanel/Property.js",
	"bin-debug/UserPanel/tool.js",
	"bin-debug/UserPanel/User.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};