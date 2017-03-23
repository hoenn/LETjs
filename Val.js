var ExpVal = function(){
    if(this.constructor === ExpVal) {
        throw new Error("Cannot instantiate abstract class");
    }
}

var NumVal = function(val){
    var test = parseInt(val);
    if(!isNaN(test)) //Is a number
        this.val = parseInt(val);
    else
        throw new Error("Cannot create NumVal of NaN");
}
NumVal.prototype = Object.create(ExpVal.prototype);
NumVal.prototype.constructor= NumVal;
NumVal.prototype.show = function NumValShow(){
    return this.val;
}

var BoolVal = function(bool){
    if(typeof bool == 'boolean')
        this.val = bool
    else
        throw new Error("Cannot create BoolVal of non boolean");
}
BoolVal.prototype = Object.create(ExpVal.prototype);
BoolVal.prototype.constructor = BoolVal;
BoolVal.prototype.show = function BoolValShow(){
    return this.val;
}

var ProcVal = function(proc){
    this.val = proc
}
ProcVal.prototype = Object.create(ExpVal.prototype);
ProcVal.prototype.constructor = ProcVal;
ProcVal.prototype.show = function ProcValShow(){
    return this.val;
}

module.exports = {
    ExpVal: ExpVal,
    NumVal: NumVal,
    BoolVal: BoolVal,
    ProcVal: ProcVal
};
