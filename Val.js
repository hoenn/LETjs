var ExpVal = function(){
    if(this.constructor === ExpVal) {
        throw new Error("Cannot instantiate abstract class");
    }
}

var NumVal = function(val){
    this.val = parseInt(val);
}
NumVal.prototype = Object.create(ExpVal.prototype);
NumVal.prototype.constructor= NumVal;
NumVal.prototype.show = function NumValShow(){
    return this.val;
}

var BoolVal = function(bool){
    this.val = bool
}
BoolVal.prototype = Object.create(ExpVal.prototype);
BoolVal.prototype.constructor = BoolVal
BoolVal.prototype.show = function BoolValShow(){
    return this.val;
}


module.exports = {
    ExpVal: ExpVal,
    NumVal: NumVal,
    BoolVal: BoolVal
};

