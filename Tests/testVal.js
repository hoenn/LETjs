var main = function(){
    var number = new VAL.NumVal(2);
    console.log("Create NumVal of 2");
    console.log(number);
    console.log("is NumVal an ExpVal?: "+ (number instanceof VAL.ExpVal));
    console.log("Create NumVal of bool?: ");
    try{
        var numValError = new VAL.NumVal(true);
    }
    catch (e){
        console.log(e.message);
    }
    console.log("\nCreate BoolVal of true");
    var bool = new VAL.BoolVal(true);
    console.log(bool);
    console.log("Create BoolVal of number?: ");
    try{
        var boolValError = new VAL.BoolVal(3);
    }
    catch (e){
        console.log(e.message);
    }
}

var VAL = require("../Val.js");
if(require.main === module) {
    main();
}
