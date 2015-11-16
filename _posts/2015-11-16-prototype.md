---
layout: post
title: 关于原型链的一些学习
---

忘了一件事, 渲染之后不是用markdown语法, 是用的CSS, 代码全乱了;

这里补上<a href="{{ site.baseurl }}blob/master/_posts/2015-11-16-prototype.md">markdown地址</a>

------

这几天在看<JavaScript框架设计>这本书, 并且在学习原型和原型链, 感觉这个东西不捋的话还是挺乱的, 捋了之后也有点儿迷糊

下面记录一些实验用的代码, 懒得解释了, 以后不懂了自己再看吧

```
function A(){
  this.name = 'A';//特权属性, 修改B的prototype指向也无法从A继承, 这就是为什么很多类工厂都用prototype.init方法做实例化的原因吧
}
A.prototype = {
  age: 9
}

function B(){

}
function C(){

}
function D() {

}
var proto = B.prototype = A.prototype;//A,B指向同一个prototype
proto.constructor = B;
C.prototype = new A();
D.prototype = new B();

var a = new A();
var b = new B();
var c = new C();
var d = new D();

console.info('a:' + a.name + '/' + a.age);//a:A/9
console.info('b:' + b.name + '/' + b.age);//b:undefined/9
console.info('c:' + c.name + '/' + c.age);//c:A/9
console.info('d:' + d.name + '/' + d.age);//d:undefined/9
d.__proto__.age = 8;//这里不会影响到A和B的实例, 但D生成的实例都会被影响
d.age = 7;//这里只影响d这个实例
console.info(d.age, d.__proto__.age);//7
var _B = d.__proto__.__proto__.constructor;//拿到了B
//_B.prototype.age = 100;//请打开注释进行污染!这里成功污染了A的prototype,  A/B出来的实例age全变成100, 但是D的不影响
console.info('a:' + a.name + '/' + a.age);//a:A/9, 污染后a:A/100
console.info('d.age:' + d.age);//d.age:7
var xx = new B();
console.info('xx.age:' + xx.age)//污染前, xx.age:9 污染后xx.age:100

var e = new D();
console.info('e.age:' + e.age);//e.age:8不受污染的影响

console.info(d.__proto__ === e.__proto__);//true, 都指向D.prorotype
console.info('a.age:' + a.age);//污染前, a.age:9, 污染后a.age:100

var f = new A();
console.info('f.age:' + f.age);//污染前, f.age:9, 污染后f.age:100
var g = new D();
console.info('g.age:' + g.age);//g.age:8不受污染的影响
console.info(A.prototype.constructor);//指向B
```

//结论: 为了防止实例数据污染prototype影响其他的实例, 请在方法里使用this.xxx对实例的数据赋值, 并且不要改变__proto__对象的值
