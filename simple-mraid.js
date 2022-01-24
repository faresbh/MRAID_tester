window.initMRAID = function () {

   function init() {
      document.documentElement.cssText = "margin:0; padding:0;";
      document.body.style.cssText = "margin:0; padding:0; background-color: #aab; color: #000; font-size: 8px; font-family: sans-serif;";
      //let html = document.firstChild.innerHTML;

      setTimeout(start, 50);
   }

   let slog = '', $log;
   function log(msg) {
      $log.innerHTML += `${msg}<br>`;
   }

   function start() {
      $log = document.createElement('div');
      $log.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: auto; background: #eef; color: #000;";
      document.body.append($log);

      log(`mraid: ${'mraid' in window ? 'yes' : 'no'}`);

      if ('mraid' in window) {
         mraid.addEventListener('error', function () {
            log('error: ' + JSON.stringify(arguments));
         });

         mraid.addEventListener('sizeChange', function () {
            log('sizeChange: ' + JSON.stringify(arguments));
         });

         mraid.addEventListener('stateChange', function (state) {
            log('stateChange: ' + JSON.stringify(arguments));
         });

         log(`getExpandProperties: ${JSON.stringify(mraid.getExpandProperties())}`);

         log(`getResizeProperties: ${JSON.stringify(mraid.getResizeProperties())}`);
      }

      $log.addEventListener('click', function () {
         log('pre-expand');
         mraid.expand();
      });

      setTimeout(resize, 1000);
   }

   function resize() {
      log('pre-resize');
      let resizeProps = {
         'width': 340, 'height': 480,
         'offsetX': 0, 'offsetY': 0,
         'customClosePosition': 'top-right',
         'allowOffscreen': true
      }
      mraid.setResizeProperties(resizeProps);
      log(`getResizeProperties: ${JSON.stringify(mraid.getResizeProperties())}`);
      mraid.resize();
      log('post-resize');
      log(`getResizeProperties: ${JSON.stringify(mraid.getResizeProperties())}`);
   }

   setTimeout(init, 50);
};
