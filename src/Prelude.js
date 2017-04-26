function loadInitEnv(e, s){ 
    for(var id in prelude){
      var exp = prelude[id];
      e = extendWithExp(e, id, exp, s)
    }

    return e;
}

var prelude = {
  "double":   "proc(y) +(y,y)"
 ,"negate":   "proc(y) -(0,y)"
 ,"square":   "proc(y) *(y,y)"
 ,"universe": "42"
}

function extendWithExp(env, name, exp, sto){
    ast = PARSER.parse(exp);
    ans = INTERP.valueOf(ast, env, sto);
    ref = STO.newRef(ans.val, ans.sto);
    return ENV.extendEnv(env, name, ref.addr);
}

var ENV = require("./Environment.js");
var STO = require("./Store.js");
var PARSER = require("../grammar/LET.js").parser;
var INTERP = require("./Interp.js");
module.exports= {
  loadInitEnv: loadInitEnv
}
