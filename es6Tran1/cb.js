let ary = [1, [2, [3, [4, 5]]], [6, 7, [8, 9, [11, 12]], 10]];
let Ary=[];
const cb=(_ary)=>{
    for(let i=0;i<_ary.length;i++){
        let cur=_ary[i]
        if(Object.prototype.toString.call(cur) === "[object Array]"){
            cb(cur);
        }else{
            Ary.push(cur);
        }
    }
}
cb(ary)