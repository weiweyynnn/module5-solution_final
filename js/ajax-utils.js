/* AJAX utility based on the Coursera course helper, with an offline sample fallback. */
(function (global) {
  'use strict';
  var ajaxUtils = {};
  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    var request = new XMLHttpRequest();
    var finished = false;
    var remoteApi = requestUrl.indexOf('coursera-jhu-default-rtdb.firebaseio.com/') !== -1;
    function finish(value) {
      if (finished) {return;}
      finished = true;
      responseHandler(value);
    }
    function fail() {
      if (finished) {return;}
      var sample = remoteApi && global.$menuFallback && global.$menuFallback.get(requestUrl);
      if (sample) {
        console.info('Live menu unavailable; displaying offline sample content.');
        finish(sample);
      } else {
        console.error('Could not load: ' + requestUrl);
        var target = document.querySelector('#main-content');
        if (target) {
          target.innerHTML = '<div class="simple-panel text-center"><h2>Unable to load the menu</h2>' +
            '<p>Please try again with a local server or check your internet connection.</p>' +
            '<a class="back-home" href="index.html">Return home</a></div>';
        }
      }
    }
    request.onreadystatechange = function () {
      if (request.readyState !== 4 || finished) {return;}
      if (request.status >= 200 && request.status < 300) {
        try {finish(isJsonResponse === false ? request.responseText : JSON.parse(request.responseText));}
        catch (err) {console.error('Invalid menu response:',err);fail();}
      } else {fail();}
    };
    request.onerror = fail;
    request.ontimeout = fail;
    request.timeout = remoteApi ? 3800 : 5500;
    request.open('GET',requestUrl,true);
    request.send(null);
  };
  global.$ajaxUtils = ajaxUtils;
})(window);
