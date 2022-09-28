//交叉类型
function extend(first, second) {
    var result = {};
    for (var i in first) {
        result[i] = first[i];
    }
    for (var i in second) {
        if (!result.hasOwnProperty(i))
            result[i] = second[i];
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log(jim.name);
    };
    return ConsoleLogger;
}());
var jim = extend(new Person('jim'), new ConsoleLogger());
jim.log();
