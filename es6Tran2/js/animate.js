let utils = (function(){
    let getCss=(curEle,attr)=>{
        let val = null;
        let reg =/^[+-]?\d+(\.\d+)?(px|pt|em|rem)?$/;
        if(window.getComputedStyle){
            val=window.getComputedStyle(curEle)[attr];
            if(reg.test(val)){
                val=parseFloat(val)
            }
        }
        return val;
    };
    let setCss=(ele,attr,value)=>{
        if(!isNaN(value)){
            if(!/^(opacity|zIndex)$/.test(attr)){
                value+='px';
            }
        }
        ele.style[attr]=value;
    };
    let setGroupCss=(ele,options)=>{
        if(Object.prototype.toString.call(options)==='[object Object]'){
            for(let attr in options){
                if(options.hasOwnProperty(attr)){
                    setCss(ele,attr,options[attr])
                }
            }
        }
    }
    let css=(...arg)=>{
        let fn=getCss,
            length=arg.length;
        if(length>2){
            fn=setCss
        }
        if(length==2&&Object.prototype.toString.call(arg[1])==='[object Object]'){
            fn=css;
        }
        return fn(...arg);
    }
    let each = (obj,cb)=>{
        if('length' in obj){
            for(let i=0;i<obj.length;i++){
                cb&&cb.call(obj[i],i,obj[i])
                if(cb&&cb.call(obj[i],i,obj[i])===false){
                    return;
                }
            }
        }
        for(let attr in obj){
            if(obj.hasOwnProperty(attr)){
                let item = obj[attr];
                cb&&cb.call(item,attr,item)
                if(cb&&cb.call(item,attr,item)===false){
                    return;
                }

            }
        }
    }
    return {css,each}
})()
~function(){
    let effet={
        linear:(t,b,c,d)=>t/d*c+b
    }
    window.animate=animate=(ele,target,duration,callback)=>{
        if(typeof duration ==='function'){
            callback = duration;
            duration=1000;
        }
        let begin ={};
        let time = 0;
        let change ={};
        utils.each(target,(key,value)=>{
            begin[key]=utils.css(ele,key);
            change[key]=value-begin[key];
        })
        clearInterval(ele.timer);
        ele.timer=setInterval(()=>{
            time +=17;
            if(time>duration){
                utils.css(ele,target);
                clearInterval(ele.timer);
                callback&&callback.call(ele);
                ele.timer=null;
                return;
            }
            utils.each(target,(key,value)=>{
                let cur=effet.linear(time,begin[key],change[key],duration);
                utls.css(ele,key,cur);
            })
        },17)
    }
}()