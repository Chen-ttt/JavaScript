// JS笔试题

// 1.
var a = {},
    b = {key: 'b'},
    c = {key: 'c'};

a[b] = 123;
a[c] = 456;
console.log("第一题", a[b]);

// 2.
var name = "world";
;(function (){
    // console.log(name);
    if(typeof name === 'undefined'){
        var name = 'J';
        console.log(name);
    } else {
        console.log("hello");
    }
})();