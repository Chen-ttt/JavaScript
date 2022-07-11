/**
 * 插件
 */

;(function(){
    var Compute = function(){}

    Compute.prototype = {
        plus: function(a, b){
            return a + b;
        },

        mul: function(a, b){
            return a * b;
        }
    }

    window.Compute = Compute;
})();

var compute = new Compute();
var res = compute.mul(2, 3);
console.log(res);