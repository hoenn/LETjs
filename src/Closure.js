function Proc(id, exp, env){
    this.Param = id;
    this.Exp = exp;
    this.Env = env;
}
function RecProc(id, exp, env){
    this.Param = id;
    this.Exp = exp;
    this.Env = env//Environment is injected later
}

module.exports = {
    Proc: Proc,
    RecProc: RecProc
}
