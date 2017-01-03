四层结构  用户》英雄》武器》宝石
英雄atk=this.initialAtk + this.level * 0.6（品质系数）+武器Atk
    def = this.initialDef + this.level * 0.6（品质系数）+武器Def
武器atk=this.atkItSelf+宝石Atk
    def=this.defItSelf+宝石Def
武器品质决定发挥镶嵌宝石的威力程度，普通0.8，稀有0.9，史诗1.0，传说1.2


/***
 * 不合理的地方AStar和地图耦合性强，只能在main里面调用
 * 虽然用了UI层级管理器但监听还是很恶心,UI层级管理器没有设置坐标的，缺点
 * hero打开hero状态面板和后面的装备打开装备面板相同，就没做了
 */