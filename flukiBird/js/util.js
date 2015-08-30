// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    // 通过 exports 对外提供接口
    function rdm(a, b) {
        return a + Math.floor(Math.random() * (b - a));
    }

    // 或者通过 module.exports 提供整个接口
    module.exports = {
        random: rdm
    };

});
