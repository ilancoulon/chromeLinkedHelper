(function() {
    'use strict';
    $(document).ready(function() {
      console.log('test');
      $('#settingsForm').submit(function (e) {
        e.preventDefault();
        console.log('test');
        chrome.storage.local.set({
          'tag': $('#tagInput').val(),
          'token': $('#tokenInput').val()
        }, function() {
          window.close();
        });
        return false;
      });
    });
})();
