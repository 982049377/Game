interface Command {
    execute(callback: Function): void;

    cancel(callback: Function): void;
}

// class WalkCommand implements Command {
//     private x;
//     private y;
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }

//     execute(callback: Function): void {
//         GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
//             callback();
//         })
//     }

//     cancel(callback: Function) {
//         GameScene.getCurrentScene().stopMove(function () {
//             callback();
//         })
//     }
// }
