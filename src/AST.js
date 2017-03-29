function Pgm(exp){
    this.Exp = exp;
}
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
function PlusExp (exp1, exp2) {
    this.Exp1 = exp1;
    this.Exp2 = exp2;
}
function TimesExp (exp1, exp2) {
    this.Exp1 = exp1;
    this.Exp2 = exp2;
}
function IfExp (cond, cons, alt)  {
    this.Exp1 = cond; //Condition
    this.Exp2 = cons; //Consequent
    this.Exp3 = alt;  //Alternative
}
function LetExp (id, val, inExp) {
    this.Id = id;
    this.Exp1 = val
    this.Exp2 = inExp
}
function ProcExp (id, exp){
    this.Param = id;
    this.Exp = exp;
}
function CallExp (exp1, exp2){
    this.Exp1 = exp1;
    this.Exp2 = exp2;
}
function LetRecExp (id1, id2, exp1, exp2){
    this.Id1 = id1;
    this.Id2 = id2;
    this.Exp1 = exp1;
    this.Exp2 = exp2;
}
function BeginExp (expseq){
    this.ExpSeq = expseq;
}
function AssignExp (id, exp){
    this.Id = id;
    this.Exp = exp;
}
module.exports = {
    Pgm: Pgm,
    ConstExp : ConstExp,
    VarExp : VarExp,
    IsZeroExp : IsZeroExp,
    DiffExp : DiffExp,
    PlusExp : PlusExp,
    TimesExp : TimesExp,
    IfExp : IfExp,
    LetExp : LetExp,
    ProcExp: ProcExp,
    CallExp: CallExp,
    LetRecExp: LetRecExp,
    BeginExp: BeginExp,
    AssignExp: AssignExp

}
