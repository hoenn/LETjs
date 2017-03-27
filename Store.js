function Store(){
    this.list = [];
}
function newRef(val, store){
    var index = store.list.length;
    store.list.push(val); 
    return {
        "ref":index,
        "sto":store
    };
}
function deref(ref, store){
    return store.list[ref];
}
function setRef(ref, val, store){
    store.list[ref] = val;
    return store;
}

module.exports = {
    Store: Store,
    newRef: newRef,
    deref: deref,
    setRef: setRef
}
