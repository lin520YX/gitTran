Array.prototype.Myunique=()=>{
    let _this=[...this];
    let obj = {}
    for(let i=0;i<_this.length;i++){
        let cur=_this[i];
        if(obj[cur]===cur){
            _this[i]=_this[_this.length-1];
            _this.length--
            i--;
            continue;
        }
        obj[cur]=cur;
    }
    obj=null;
    return _this;

}
console.log([1,2,3,1,3].Myunique())