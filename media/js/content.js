/**
 * content.js
 *
 * Gestion et modification de la page Linkedin (ajout d'évènements, changements d'aspect...)
 */

(function() {
    'use strict';

    chrome.runtime.sendMessage({type: 'parameters', properties: ['tag', 'activated']}, function(response) {
      if (response.activated) { // On ne touche à rien si l'extension n'est pas activée
        $('a:contains("Se connecter")')
            .css('background-color', '#59b76d')
            .css('border-bottom', '3px solid #479257')
            .css('background-image', 'none')
            .append(' avec le tag "'+response.tag+'"')
            .click(function (event) {
              var pathArray = window.location.pathname.split('/');
              var candidateId = pathArray[pathArray.length - 1];
              chrome.runtime.sendMessage({type: 'connection', candidateId: candidateId});
            });
      }
    });

})();
