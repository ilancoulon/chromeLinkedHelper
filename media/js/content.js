/**
 * content.js
 *
 * Gestion et modification de la page Linkedin (ajout d'évènements, changements d'aspect...)
 */

(function() {
    'use strict';

    // On gère ici comment scrapper les paramètres à envoyer en fonction de la page dans laquelle on se trouve
    var getParameters = function(element) {
      var parameters = {};
      var pathArray = window.location.pathname.split('/');
      if (pathArray[pathArray.length - 2] == "in") {
        parameters.linkedinURL = window.location.protocol+'//'+window.location.host+window.location.pathname;
        parameters.fullName = $('.full-name').text();
      } else if (pathArray[pathArray.length - 2] == "vsearch") {
        var linkEl = $(element).parents().siblings('h3').children('a');
        parameters.linkedinURL = linkEl.attr("href");
        parameters.fullName = linkEl.text();
      }
      return parameters;
    };

    chrome.runtime.sendMessage({type: 'parameters', properties: ['tag', 'activated']}, function(response) {
      if (response.activated) { // On ne touche à rien si l'extension n'est pas activée
        $('a:contains("Se connecter")')
            .css('background-color', '#59b76d')
            .css('border-bottom', '3px solid #479257')
            .css('background-image', 'none')
            .append(' avec le tag "'+response.tag+'"')
            .click(function (event) {
              chrome.runtime.sendMessage({type: 'connection', parameters: getParameters(this)});
            });
      }
    });

})();
