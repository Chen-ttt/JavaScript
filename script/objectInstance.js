/**
 * 对象&实例化
 */

// 对象字面量
var student = {
    name: 'Anna',
    age: 18,
    score: 60,
    study: function(){
        // this指对象本身;即student.score
        this.score += 10;
        console.log('Studying...Score:', this.score);
    },
    play: function(){
        console.log("Playing...");
    }
};

// 系统自带的构造函数
var people = new Object();
people.name = 'Mary';
people.age = 20;

student.study();
student.study();

// 增
student.weight = 55;
console.log("Add weight:", student);

// 删
delete student.play;
console.log("Delete play:", student);

// 改
student.age = 88;
console.log("Change age:", student);

// 查
console.log("View:", student.study);


/**
 * 自定义构造函数
 *   命名: 大驼峰
 */
function Student(name, age){
    this.name = name;
    this.age = age;
    this.study = function(){
        console.log("St udy...");
    }
}
var mary = new Student('Mary', 19);
var ken = new Student('Ken', 34);
console.log(mary);
console.log(ken);