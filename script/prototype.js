/**
 * 原型
 *   prototype: 构造函数实例化的所有对象的公共祖先
 *              所有被该构造函数实例化出来的对象都将继承原型上的属性和方法
 */

// 将共有的固定的属性和方法写在原型中,所有对象自动继承

function Phone(color, brand){
    this.color = color;
    this.brand = brand;
}

Phone.prototype.screen = '11';
Phone.prototype.rom = '64G';
Phone.prototype.call = function(){
    console.log("I'm calling...");
}

var p1 = new Phone('red', 'iphone');
console.log("phone1访问screen", p1.screen);
console.log("phone1访问rom", p1.rom);
p1.call();

/**
 * 通过实例化的对象对prototype里的属性和方法进行增删改,都不行
 */

delete p1.screen;
console.log("删除原型中screen属性有效果吗?", Phone.prototype);
p1.screen = '0';
console.log("修改原型中screen属性有效果吗?", Phone.prototype);

/**
 * 原型一般写成对象形式
 *   但若用这种方式,则一些prototype原有自带的属性会被覆盖掉,例如constrcutor
 */
console.log("用对象定义原型之前,constructor", Phone.prototype.constructor);
Phone.prototype = {
    screen: '11',
    rom: '64G',
    price: '6499',
    call: function(){
        console.log("I'm calling...");
    },
    reopen: function(){
        console.log("I'm reopening...");
    }
}
console.log("用对象定义原型之后,constructor", Phone.prototype.constructor);

// Hint: 通过定义prototype也可以硬改一个构造函数
//       也可以硬改一个别人的prototype
Phone.prototype = {
    constructor: function(){}
}
console.log(Phone.prototype);


// 复盘 - objectInstance.js
function People(name, age){
    // this = {}; // 隐式添加这句
    // 其实是
    // this = {
    //     __proto__: People.prototype
    //     // __proto__是装原型的容器,是prototype的键名
    // };
    this.name = name;
    this.age = age;
    // return this; // 隐式添加这句
}
People.prototype.gender = 'Male';
var mary = new People('Mary', 18);
console.log("查看Mary的性别", mary.gender); // 先在实例化对象中找,找不到则到this.__proto__中找

// 构造器constructor指向构造函数本身
console.log(mary.constructor);
console.log(People.prototype.constructor);

/**
 * !!! 原型的动态性
 * 体现在实例和原型之间的松散连接关系使得原型的属性改动可以反映在实例上; 所谓松散连接关系, 即为实例与原型的连接是一个指针
 */

/**
 * 例.对实例化产生的对象, 要修改prototype中的属性: gender
 * 
 * 1. 情况1
 * 使用对象直面量进行重新赋值, 将破坏动态性
 * 
 *    结果: 可以看到, mary的prototype中gender仍然是‘Male’, 未被修改; 但是mary的constructor中仍有一个prototype, 其中的gender已变成‘Female’
 * 
 *   原因: 这是因为, 在实例化mary时, 构造函数中隐式创建了this对象, this.__proto__指向了当时构造函数默认的prototype, 此时prototype中的性别就是‘Male’
 *        而在使用了对象直面量对prototype重新赋值后, People.prototype就指向了新的object的地址; 但mary仍指向原来默认的prototype
 *        因此输出mary会发现, mary的prototype中的gender并没有改变, 而构造函数的prototype变了
 */
People.prototype = { // 改不了
    gender: 'Female'
}
console.log("重写prototype能改变gender吗?", mary);
console.log("重写prototype能改变gender吗?", People.prototype);

/**
 * 2. 情况2
 * 实例化一个新的对象tong, 并对prototype中的属性重新赋值, 则不会破坏动态性
 * 
 *   结果: 直接改变了对象中的prototype属性和对象中的constructor中的prototype属性
 *   原因: 在上一步 重写ptototype之后, People.prototype(即构造函数中的原型)已经指向了新object的地址; 因此在重写后实例化的新对象(例如tong)已经指向新的prototype
 *        并且直接赋值的方式并没有改变prototype的地址, 情况2相当于对当前的prototype进行原地改动, 因此不会发生指向错误
 */
var tong = new People('Tong', 19);
People.prototype.gender = 'HaHa'; // 能改
console.log("赋值prototype能改变gender吗?", tong);
console.log("赋值prototype能改变gender吗?", People.prototype);

/**
 * 3. 情况3
 * 在情况1重写了prototype之后, 是否能通过重新赋值来改变mary对象的gender属性呢?
 * 
 *   结果: 可以看到, mary的prototype中gender仍然是‘Male’, 未被修改; 但是mary的constructor中仍有一个prototype, 其中的gender已变成‘333’
 *   原因: 道理和情况1一样, 在重写ptototype之后, People.prototype(即构造函数中的原型)已经指向了新object的地址; 只有在重写后实例化的新对象(例如tong)才能指向新的prototype; 而在这之前实例化的旧对象(例如mary)仍指向之前的默认的老prototype
 *        而直接赋值改变的是新prototype(因此能在constructor中的prototype看到改变为'333'); 而打印mary时, mary的prototype仍引用的是旧prototype, gender仍是‘Male’
 */
People.prototype.gender = '333'; // 不能能改
console.log("赋值prototype能改变gender吗?", mary);
console.log("赋值prototype能改变gender吗?", People.prototype);

// 笔试题
function Car(){
    this.brand = 'Benz'
}

Car.prototype = {
    brand: 'Mazda',
    intro: function(){
        console.log("Brand is", this.brand);
    }
}

var car = new Car();
car.intro();
// 输出this.brand, 谁调用 this就指向谁; 此时this指向实例化对象car本身, 而对象本身就有brand属性, 因此一定输出的是Benz
Car.prototype.intro();
// 此时this指向Car.prototype, 因此一定输出Car.prototype中的brand - Mazda