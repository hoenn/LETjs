function valueOf (e, p, s) {
    switch(e.constructor){
        case AST.Pgm:
                return (valueOf(e.Exp, p, s)).val;
                break;
        case AST.ConstExp: 
                return {
                       "val": new VAL.NumVal(e.Int),
                       "sto": s
                    }
                break;
        case AST.VarExp:
                return {
                        "val": ENV.applyEnv(p, e.Id),
                        "sto": s
                        }
                break;
        case AST.IsZeroExp:
                var answer = valueOf(e.Exp, p, s)

                return {
                        "val" : new VAL.BoolVal(answer.val == 0),
                        "sto": answer.sto
                       }
                break;
        case AST.DiffExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2 =valueOf(e.Exp2, p, ans1.sto);
                return {
                        "val": new VAL.NumVal(ans1.val.val - ans2.val.val),
                        "sto": ans2.sto
                        }
                
                break;
        case AST.PlusExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2  =valueOf(e.Exp2, p, ans1.sto);
                return {
                        "val": new VAL.NumVal(ans1.val.val + ans2.val.val),
                        "sto": ans2.sto
                       }
                break;
        case AST.TimesExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2 =valueOf(e.Exp2, p, ans1.sto);
                return {
                        "val": new VAL.NumVal(n1.val * n2.val),
                        "sto": ans2.sto
                       }
                break;
        case AST.LetExp:
                var body = e.Exp2;
                var ans = valueOf(e.Exp1, p, s);
                var pp = ENV.extendEnv(p, e.Id, ans.val);
                return valueOf(body, pp, ans.sto);
                break;
        case AST.IfExp: 
                var ans = valueOf(e.Exp1, p, s);
                if (ans.val.val == true){
                    return valueOf(e.Exp2, p, ans.sto);
                } else {
                    return valueOf(e.Exp3, p, ans.sto);
                }
                break;
        case AST.ProcExp:
                return {
                    "val": new VAL.ProcVal(new PROC.Proc(e.Param, e.Exp, p)),
                    "sto": s
                    }
                break;
        case AST.CallExp: 
                var rator = e.Exp1;
                var rand = e.Exp2;
                var procAns = valueOf(rator, p, s);
                var argAns = valueOf(rand, p, procAns.sto);
                return applyProcedure(procAns.val, argAns.val, argAns.sto);
                break;
        case AST.LetRecExp: 
                var pname = e.Id1;
                var bvar = e.Id2;
                var pbody = e.Exp1;
                var body = e.Exp2;
                var wrappedProc = new VAL.ProcVal(new PROC.RecProc(bvar,pbody));
                var pp = ENV.extendEnv(p, pname, wrappedProc);
                return valueOf(body, pp, s);
                break;
        case AST.BeginExp:
                var es = e.ExpSeq;
                if (es.length > 0){
                    head = es[0];
                    headAns = valueOf(head, p, s);
                    //If there is only one item left
                    if(es.length == 1){
                        return {
                            "val": headAns.val,
                            "sto": headAns.sto
                        }
                            
                    } else { //Evaluate the rest
                        return valueOf(new AST.BeginExp(es.slice(1)), p, headAns.sto)
                    } 

                } else {
                    //Shouldn't happen
                    //Need to improve error handling..
                    console.log(es.length);
                    console.log("Undefined**");
                }
                break;
        case AST.NewRefExp:
                var ans = valueOf(e.Exp1, p, s);
                var ref = STO.newRef(ans.val, ans.sto);
                return {
                    "val": new VAL.RefVal(ref.addr),
                    "sto": ref.sto
                }
                break;
        case AST.DerefExp:
                var ans = valueOf(e.Exp1, p, s);
                var addr = ans.val.val;
                var value = STO.deref(addr, ans.sto);
                return {
                    "val": value,
                    "sto": ans.sto
                }
                break;
        case AST.SetRefExp:
                var ans1 = valueOf(e.Exp1, p, s);
                var ans2 = valueOf(e.Exp2, p, ans1.sto);
                var oldVal = STO.deref(ans1.val.val, s);
                var addr = STO.setRef(ans1.val.val, ans2.val, ans2.sto);
                return {
                    "val": oldVal,
                    "sto": addr
                }
                break
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
STO = require("./Store.js");
util = require("util");
