
function Env(i, v, e){
    this.id = i;
    this.val = v;
    this.savedEnv = e;
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
        return e.val;
    }
    else{
        return applyEnv(e.savedEnv, i);
    }
}


module.exports = {
    Env: Env,
    isEmpty: isEmpty,
    extendEnv: extendEnv,
    applyEnv: applyEnv
}
