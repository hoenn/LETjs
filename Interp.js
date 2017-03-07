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
    }
}
module.exports = {
    valueOf: valueOf
}
AST = require("./AST.js");
ENV = require("./Environment.js");
VAL = require("./Val.js");
