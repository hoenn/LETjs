function valueOf (e, p, s) {
    switch(e.constructor){
        case AST.Pgm:
                return (valueOf(e.Exp, p, s)).val;
                break;

        case AST.ConstExp: 
                return new Answer(new VAL.NumVal(e.Int), s);
                break;

        case AST.VarExp:
                var addr = ENV.applyEnv(p, e.Id);
                return new Answer(STO.deref(addr, s), s);
                break;

        case AST.IsZeroExp:
                var answer = valueOf(e.Exp, p, s)
                return new Answer(new VAL.BoolVal(answer.val.val == 0), answer.sto);
                break;

        case AST.DiffExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2 =valueOf(e.Exp2, p, ans1.sto);
                return new Answer(new VAL.NumVal(ans1.val.val - ans2.val.val), ans2.sto);
                break;

        case AST.PlusExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2  =valueOf(e.Exp2, p, ans1.sto);
                return new Answer(new VAL.NumVal(ans1.val.val+ans2.val.val), ans2.sto);
                break;

        case AST.TimesExp: 
                var ans1 =valueOf(e.Exp1,p, s);
                var ans2 =valueOf(e.Exp2, p, ans1.sto);
                return new Answer(new VAL.NumVal(ans1.val.val*ans2.val.val, ans2.sto));
                break;

        case AST.LetExp:
                var body = e.Exp2;
                var ans = valueOf(e.Exp1, p, s);
                var ref = STO.newRef(ans.val, ans.sto);
                var pp = ENV.extendEnv(p, e.Id, ref.addr);
                return valueOf(body, pp, ref.sto);
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
                return new Answer(new VAL.ProcVal(new PROC.Proc(e.Param, e.Exp, p)), s);
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

                //Reserve a place in the store
                var ref = STO.newRef(null, s);
                //Extend the environment with ref to place in the store
                var pp = ENV.extendEnv(p, pname, ref.addr);
                //Wrap the LetRec in a Proc
                var wrappedProc = new VAL.ProcVal(new PROC.Proc(bvar,pbody, pp));
                //Store wrapped proc in the reserved place
                var s2 = STO.setRef(ref.addr, wrappedProc, ref.sto);
                return valueOf(body, pp, s2);
                break;

        case AST.BeginExp:
                var es = e.ExpSeq;
                if (es.length > 0){
                    head = es[0];
                    var headAns = valueOf(head, p, s);
                    //If there is only one item left
                    if(es.length == 1){
                        return new Answer(headAns.val, headAns.sto);
                    } else { //Evaluate the rest
                        return valueOf(new AST.BeginExp(es.slice(1)), p, headAns.sto)
                    } 

                } else {
                    console.log("Undefined Behavior");
                }
                break;
        case AST.AssignExp:
                var ans = valueOf(e.Exp, p , s);
                var oldVal = STO.deref(ENV.applyEnv(p, e.Id), s);
                var s2 = STO.setRef( (ENV.applyEnv(p, e.Id)), ans.val, ans.sto);
                return new Answer(oldVal , s2);
                break;

    }
}
function applyProcedure(proc, arg, sto){
    var param = proc.val.Param;
    var body = proc.val.Exp;
    var savedEnv = proc.val.Env;
    var ref = STO.newRef(arg, sto);
    var newEnv = ENV.extendEnv(savedEnv, param, ref.addr);
    return valueOf(body, newEnv, ref.sto);
}

function Answer(v, s){
    this.val = v;
    this.sto = s;
}

module.exports = {
    valueOf: valueOf
}
AST = require("./AST.js");
ENV = require("./Environment.js");
VAL = require("./Val.js");
PROC = require("./Closure.js");
STO = require("./Store.js");
