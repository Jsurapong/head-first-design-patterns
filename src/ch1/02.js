var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.swim = function () {
        console.log("swim");
    };
    Duck.prototype.display = function () {
        console.log("duck");
    };
    return Duck;
}());
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MallardDuck.prototype.quack = function () {
        console.log("quack");
    };
    MallardDuck.prototype.fly = function () {
        console.log("fly");
    };
    return MallardDuck;
}(Duck));
function main() {
    var mallardDuck = new MallardDuck();
    mallardDuck.display();
    mallardDuck.quack();
    mallardDuck.swim();
    mallardDuck.fly();
}
