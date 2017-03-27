var main = function(){
    var sto1 = new STO.Store();
    var val1 = 5;
    var ref1 = STO.newRef(val1, sto1);
    console.log("\nCreate a new reference for 5");
    console.log("Reference 'memory location': " + ref1.ref);
    console.log("Value at this location " + STO.deref(ref1.ref,sto1));

    var val2 = 10;
    var ref2 = STO.newRef(val2, sto1);
    console.log("\nCreate a new reference for 10");
    console.log("Reference 'memory location': "+ref2.ref);
    console.log("Value at this location " + STO.deref(ref2.ref, sto1));
    
    var val3 = 15;
    console.log("\nSet the reference at 0 to 15 (replacing 5)");
    STO.setRef(ref1.ref, val3, sto1);
    console.log("Value at this location " + STO.deref(ref1.ref, sto1));

}


var STO = require("../Store.js");
if(require.main === module) {
    main();
}
