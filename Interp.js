function valueOf (e, p) {
    switch(e.constructor){
        case AST.Pgm:
                return valueOf(e.Exp);
                break;
        case AST.ConstExp: 
                return Number(e.Int);
                break;
        case AST.VarExp:
                return ENV.applyEnv(p, e.Id);
                break;
        case AST.IsZeroExp:
                return valueOf(e.Exp, p) == 0;
                break;
        case AST.DiffExp: 
                return valueOf(e.Exp1, p) - valueOf(e.Exp2, p);
                break;
        case AST.LetExp:
                var body = e.Exp2;
                var v = valueOf(e.Exp1, p);
                var pp = ENV.extendEnv(p, e.Id, v);
                return valueOf(body, pp);
                break;
        case AST.IfExp: 
                if (valueOf(e.Exp1, p) == true){
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
