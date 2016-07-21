(function() {
    'use strict';

    $('a:contains("Se connecter")')
        .css('background-color', '#59b76d')
        .css('border-bottom', '3px solid #479257')
        .css('background-image', 'none')
        .click(function (event) {
          event.preventDefault();
          chrome.runtime.sendMessage({properties: ['tag', 'token']}, function(response) {
            // Here we have access to our parameters
            console.log(response.tag);
            console.log(response.token);
          });
          return false;
        });
})();
