/**
 * 继承&圣杯模式
 */

// 解决原型链问题 - 继承父类属性
Teacher.prototype = {
    job: 'Math'
};
function Teacher(name, mSkill){
    this.name = name;
    this.mSkill = mSkill;
}

function Student(name, mSkill, age, major){
    Teacher.apply(this, [name, mSkill]);
    this.age = age;
    this.major = major;
}

var student = new Student('Tong', 'JS', 18, 'CS');
console.log(student);

// 问题: 如何让Student继承Teacher原型中的属性?
var t = new Teacher('Anna', 'HTML');
Student.prototype = t;
var newS = new Student('Chen', 'CSS', 20, 'Music');
console.log(newS);

// 但!!! 出现了新的问题
// Student即继承了Teacher的原型中的job属性, 同时也继承了实例对象的name和mSkill属性, 这是不合理的, 不是每个人都叫Anna
// 因此
Student.prototype = Teacher.prototype;
var newS2 = new Student('Chentt', 'C++', 30, 'Music');
console.log(newS2); // 只继承了Teacher的原型属性

// 但!!! 此时Student和Teacher同时引用同一个对象作为原型
// 这是不合理的, 任何一方修改原型都会影响另一方
// Student.prototype.course = 2;
// console.log(Teacher.prototype);

/**
 * !!! 完美解决方案 - 圣杯模式
 * 此时 Buffer和Teacher同级, Student继承Buffer
 */
function Buffer(){};
Buffer.prototype = Teacher.prototype;
var buffer = new Buffer();
Student.prototype = buffer;

var newS3 = new Student('Chenttt', 'Python', 90, 'Piano');
console.log(newS3);
console.log()

// 将上述方法封装成函数
function interit(Target, Origin){
    function Buffer(){};
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    // 将构造器指回来
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
}
