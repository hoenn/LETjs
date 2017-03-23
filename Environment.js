
function Env(i, v, e){
    this.id = i;
    this.val = v;
    this.savedEnv = e;
}
function emptyEnv(){
    return new Env(null,null,null);
}
function isEmpty(e){
    return typeof e === "undefined"
}
function extendEnv(e, i, v){
    newEnv = new Env(i, v, e);
    return newEnv;
}
function applyEnv(e, i){
    if(isEmpty(e)){
        return "Not found"
    }
    else if(e.id == i){
        return expand(e, e.val);
    }
    else{
        return applyEnv(e.savedEnv, i);
    }
}
function expand(e, v){
    //If the value is a proc val that contains a recursive proc
    if(v.constructor == VAL.ProcVal && v.val.constructor = PROC.RecProc){
        var param = v.val.Param;
        var body = v.val.Exp;
        return new VAL.ProcVal(new PROC.Proc(param, body, e));
    }
    else {
        return v;
    }
}
var VAL = require('./Val.js');
var PROC = require('./Closure.js');

module.exports = {
    Env: Env,
    emptyEnv: emptyEnv,
    isEmpty: isEmpty,
    extendEnv: extendEnv,
    applyEnv: applyEnv
}
