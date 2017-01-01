class SceneService implements EventEmitter{
   
    public addObserver(observer:Observer){
    }

    public notify(id:string){
        var task=TaskService.getIntance()._tasklist[id];
        TaskService.getIntance()._tasklist[id]._condition. onchange(task);
    }
}