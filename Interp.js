function valueOf (e, p) {
    switch(e.constructor){
        case AST.Pgm:
                return valueOf(e.Exp);
                break;
        case AST.ConstExp: 
                return new VAL.NumVal(e.Int);
                break;
        case AST.VarExp:
                return ENV.applyEnv(p, e.Id);
                break;
        case AST.IsZeroExp:
                return new VAL.BoolVal(valueOf(e.Exp, p).val == 0);
                break;
        case AST.DiffExp: 
                var n1 =valueOf(e.Exp1,p);
                var n2 =valueOf(e.Exp2, p);
                return new VAL.NumVal(n1.val - n2.val);
                break;
        case AST.PlusExp: 
                var n1 =valueOf(e.Exp1,p);
                var n2 =valueOf(e.Exp2, p);
                return new VAL.NumVal(n1.val + n2.val);
                break;
        case AST.TimesExp: 
                var n1 =valueOf(e.Exp1,p);
                var n2 =valueOf(e.Exp2, p);
                return new VAL.NumVal(n1.val * n2.val);
                break;
        case AST.LetExp:
                var body = e.Exp2;
                var v = valueOf(e.Exp1, p);
                var pp = ENV.extendEnv(p, e.Id, v);
                return valueOf(body, pp);
                break;
        case AST.IfExp: 
                var test = valueOf(e.Exp1, p);
                if (test.val == true){
                    return valueOf(e.Exp2, p);
                } else {
                    return valueOf(e.Exp3, p);
                }
                break;
        case AST.ProcExp:
                return new VAL.ProcVal(new PROC.Proc(e.Param, e.Exp, p));
                break;
        case AST.CallExp:
                var rator = e.Exp1;
                var rand = e.Exp2;
                var proc = valueOf(rator, p);
                var arg = valueOf(rand, p);
                return applyProcedure(proc, arg);
                break;
        case AST.LetRecExp:
                var pname = e.Id1;
                var bvar = e.Id2;
                var pbody = e.Exp1;
                var body = e.Exp2;
                var wrappedProc = new VAL.ProcVal(new PROC.RecProc(bvar,pbody));
                var pp = ENV.extendEnv(p, pname, wrappedProc);
                return valueOf(body, pp);
                break;
    }
}
function applyProcedure(proc, arg){
    var param = proc.val.Param;
    var body = proc.val.Exp;
    var savedEnv = proc.val.Env;
    return valueOf(body, (ENV.extendEnv(savedEnv, param, arg)));
}
module.exports = {
    valueOf: valueOf
}
AST = require("./AST.js");
ENV = require("./Environment.js");
VAL = require("./Val.js");
PROC = require("./Closure.js");
