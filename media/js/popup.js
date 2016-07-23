/**
 * popup.js
 *
 * Gestion, validation et soumission du formulaire des paramètres de l'application
 */

(function() {
    'use strict';
    $(document).ready(function() {
      var isFormValid = function() {
        return !$('#activatedCheckbox').prop("checked") || $('#tagInput').val() != "";
      };

      chrome.runtime.sendMessage({type: 'parameters', properties: ['tag', 'token', 'activated']}, function(response) {
         $('#tagInput').val(response.tag);
         $('#tokenInput').val(response.token);
         $('#activatedCheckbox').prop("checked", response.activated);
         $('#activatedCheckbox').trigger('change');
      });
      $('#settingsForm').submit(function (e) {
        e.preventDefault();
        if (isFormValid()) {
          chrome.storage.local.set({
            'activated': $('#activatedCheckbox').prop("checked"),
            'tag': $('#tagInput').val(),
            'token': $('#tokenInput').val()
          }, function() {
            chrome.tabs.query({url: "https://www.linkedin.com/*"}, function (tabs) {
              $.each(tabs, function(index, tab) {
                chrome.tabs.reload(tab.id);
              });
              window.close();
            });
          });
        }
        else {
          alert('Vous vous devez renseigner le tag.');
        }

        return false;
      });
      $('#activatedCheckbox').change(function(event) {
        $('#tokenInput').prop("disabled", !$('#activatedCheckbox').prop("checked"));
        $('#tagInput').prop("disabled", !$('#activatedCheckbox').prop("checked"));
      });
      $('#activatedCheckbox').trigger('change');
    });
})();
