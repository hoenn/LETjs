function ConstExp(i)  {
    this.Int = i;
}
function VarExp(id) {
    this.Id  = id;
}
function IsZeroExp (exp) {
    this.Exp = exp;
}
function DiffExp (exp1, exp2) {
    this.Exp1 = exp1;
    this.Exp2 = exp2;
}
function IfExp (cond, cons, alt)  {
    this.Exp1 = cond; //Condition
    this.Exp2 = cons; //Consequent
    this.Exp3 = alt;  //Alternative
}
//id is a strng not an expression
function LetExp (id, val, inExp) {
    this.Id = id;
    this.Exp1 = val
    this.Exp2 = inExp
}

module.exports = {
    ConstExp : ConstExp,
    VarExp : VarExp,
    IsZeroExp : IsZeroExp,
    DiffExp : DiffExp,
    IfExp : IfExp,
    LetExp : LetExp
}
