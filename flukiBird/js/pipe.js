// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // 通过 require 引入依赖
  var $ = require('jquery');

  // 通过 exports 对外提供接口
  exports.Pipe = function(args) {
      var pipePair = '<div id="pair-' + args.index + '" class="pipe-pair">'
                      + '<div class="pipe top-pipe">'
                          + '<div class="hammer"></div>'
                      + '</div>'
                      + '<div class="pipe bottom-pipe">'
                          + '<div class="hammer"></div>'
                      + '</div>'
                   + '</div>';
      var jqPipePair = $(pipePair);
      var container = $('.container');
      var totalHeight = container.height();
      var totalWidth = container.width();

      jqPipePair.css({
          left: args.left + 'px',
          transform: 'translate3d(' + totalWidth + 'px, 0, 0)'
      });

      jqPipePair.children('.top-pipe').css({
          height: args.top + 'px'
      });

      jqPipePair.children('.bottom-pipe').css({
          height: totalHeight - args.top - args.height + 'px'
      });

      container.append(jqPipePair);
      setTimeout(function() {
          jqPipePair.css({
              transform: 'translate3d(-' + totalWidth + 'px, 0, 0)'
          });
      }, 30);


      setTimeout(function() {
          jqPipePair.remove();
      }, 9000);

  };

  // 或者通过 module.exports 提供整个接口
  // module.exports = ...

});
