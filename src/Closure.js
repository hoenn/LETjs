function Proc(id, exp, env){
    this.Param = id;
    this.Exp = exp;
    this.Env = env;
}
function RecProc(id, exp){
    this.Param = id;
    this.Exp = exp;
    //Environment is injected later
}

module.exports = {
    Proc: Proc,
    RecProc: RecProc
}
