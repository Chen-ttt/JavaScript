// 引用值

// array
var arr = [1, 2, undefined, null];
console.log(arr.length);

// object: key-value pair
var person = {
    name: 'Any',
    age: 18,
    height: 175,
    job: 'student',
};
console.log(person.name, "'s job is", person.job);

// typeof
console.log(typeof(null)); // object(特殊情况bug,null最早是指空对象指针,因此类型为object)
console.log(typeof(undefined)); // undefined
console.log(typeof({})); // object
console.log(typeof([])); // object
console.log(typeof(function(){})); // function

console.log(a); 
console.log(typeof(a)); // undefined

console.log(typeof(1-"1")); // number
console.log(typeof("1"-"1")); // number

