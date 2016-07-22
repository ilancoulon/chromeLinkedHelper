(function() {
    'use strict';
    $(document).ready(function() {
      chrome.runtime.sendMessage({type: 'parameters', properties: ['tag', 'token']}, function(response) {
         $('#tagInput').val(response.tag);
         $('#tokenInput').val(response.token);
         $('#activatedCheckbox').prop("checked", response.activated);
      });
      $('#settingsForm').submit(function (e) {
        e.preventDefault();
        chrome.storage.local.set({
          'activated': $('#activatedCheckbox').prop("checked"),
          'tag': $('#tagInput').val(),
          'token': $('#tokenInput').val()
        }, function() {
          window.close();
        });
        return false;
      });
      $('#activatedCheckbox').change(function(event) {
        $('#tokenInput').prop("disabled", !$('#activatedCheckbox').prop("checked"));
        $('#tagInput').prop("disabled", !$('#activatedCheckbox').prop("checked"));
      });
    });
})();
