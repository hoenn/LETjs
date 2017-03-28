var main = function(){
    var env1 = Env.Env(null,null,null) 
    console.log("Is empty: " + Env.isEmpty(env1))
    env1 = Env.extendEnv(env1, 'a', 1);
    console.log("Extend a->1");
    env1 = Env.extendEnv(env1, 'b', 2);
    console.log("Extend b->2");
    console.log("Search for a: "+ Env.applyEnv(env1, 'a'));
    
    env1 = Env.extendEnv(env1, 'a', 3);
    console.log("Extend a->3");
    console.log("Search for a: " + Env.applyEnv(env1, 'a'));

    console.log("Search for x: " + Env.applyEnv(env1, 'x'));
}
var Env = require("../src/Environment.js");
if(require.main === module) {
    main();
}
