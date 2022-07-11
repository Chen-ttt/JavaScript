// JS笔试题

var a = {},
    b = {key: 'b'},
    c = {key: 'c'};

a[b] = 123;
a[c] = 456;
console.log("第一题", a[b]);