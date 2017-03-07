var main = function(){
    var number = new VAL.NumVal(2);
    console.log(number.show());
    var bool = new VAL.BoolVal(true);
    console.log(bool.show());
}

var VAL = require("../Val.js");
if(require.main === module) {
    main();
}
