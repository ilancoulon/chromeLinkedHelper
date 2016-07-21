(function() {
    'use strict';
    $(document).ready(function() {
      chrome.runtime.sendMessage({type: 'parameters', properties: ['tag', 'token']}, function(response) {
         $('#tagInput').val(response.tag);
         $('#tokenInput').val(response.token);
      });
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
