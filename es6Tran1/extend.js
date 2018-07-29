/*
* 面向对象：类的封装，继承，多态
* 封装 低耦合高内聚
* */
//原型继承
function A(){
    this.x=100;
}
A.prototype={
    constructor:A,
    getX:function () {
        console.log(this.x);
    }
}
function B(){

}
B.prototype=new A;
var b= new B();

//call
function A(){
    this.x=100;
}
A.prototype={
    constructor:A,
    getX:function () {
        console.log(this.x);
    }
}
function B(){
    A.call(this);
}
var b= new B();
//计生继承
function A(){
    this.x=100;
}
A.prototype={
    constructor:A,
    getX:function () {
        console.log(this.x);
    }
}
function B(){
    A.call(this)
}
B.prototype=Object.create(A.prototype);
var b= new B();

//es6 继承
class A {
    constructor() {
        this.x = 100;
    }

    getX() {
        console.log(this.x);
    }
}

class B extends A {//=>extends类似于实现了原型继承
    constructor() {
        super();//=>类似于CALL继承：在这里SUPER相当于把A的CONSTRUCTOR给执行了，并且让方法中的THIS是B的实例，SUPER当中传递的实参都是在给A的CONSTRUCTOR传递
        this.y = 200;
    }

    getY() {
        console.log(this.y);
    }
}

let f = new B();
