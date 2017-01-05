class TaskPanel extends egret.DisplayObjectContainer implements Observer {
    private _tasklist:Task[];
    private _textfield:egret.TextField;
    private _returnButton:egret.Bitmap;
    private _background:egret.Bitmap;
    private _container:egret.DisplayObjectContainer;
    public constructor(){
        super();
        this._tasklist=[];
        this._textfield=new egret.TextField();
        this._textfield.x=20;
        this._textfield.y=40;
        this._textfield.width=360;
        this._textfield.height=200;
        this._returnButton=new egret.Bitmap();
        this._returnButton.anchorOffsetX=this._returnButton.width/2;
        this._returnButton.anchorOffsetY=this._returnButton.height/2;
        this._returnButton.scaleX=0.4;
        this._returnButton.scaleY=0.4;
        this._returnButton.x=160;
        this._returnButton.y=230;
        this._background=new egret.Bitmap();
        this._background.width=400;
        this._background.height=280;

        this._container=new egret.DisplayObjectContainer();
        this._container.width=this._background.width;
        this._container.height=this._background.height;
        this._container.addChild(this._background);
        this._container.addChild(this._returnButton);
        this._container.addChild(this._textfield);
        //this.addChild(this._container);
        this.getTask();
        this.returnButtonListener();
    }
    public call(){
        this.addChild(this._container);
        this.getTask();
        //var str="001";
        //TaskService.getIntance().Canfinish(str);
        this._textfield.text=this.getText();
        this._background.texture=RES.getRes("TaskPanelbg_png");
        this._returnButton.texture=RES.getRes(DialoguePanel.texturelist["退出"]);
        console.log("TaskPanel.call");
    }
    
    private returnButtonListener(){//侦听最好放在构造函数里
        this._returnButton.touchEnabled=true;
        this._returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            console.log("removeChild");
            this.removeChild(this._container);
            //this.parent.removeChild(this);
        },this)
    }

    private getText():string{
        var str:string="";
        for(let task of this._tasklist)
        {
            str+=task.getname()+"      ";
            if(task.getstatus()==statusType.Working)
                str+="执行中\n";
            if(task.getstatus()==statusType.Cancomplete)
                str+="可完成\n";
        }
        return str;
    }
    public onchange(task:Task){
        for(var s of this._tasklist){
            if(s.getfromNpcId==task.getfromNpcId)
                console.log(this+"发出任务");
            if(s.gettoNpcId==task.gettoNpcId)
                console.log(this+"完成任务");
        }
    }
    private getTask(){
        var NPCRule:Function=   (tasklist):Task[]=>{
            var temptasklist:Task[]=[];
            for (var id in tasklist){
               var task:Task=tasklist[id];
               if(task.getstatus()==statusType.Working){
                   temptasklist.push(task);
               }
               if(task.getstatus()==statusType.Cancomplete){
                    temptasklist.push(task);
               }
            }
            return temptasklist;
        }
        this._tasklist=TaskService.getIntance().getTaskByCustomRule(NPCRule);
    }

}