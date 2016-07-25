/**
 * background.js
 *
 * Fonctions tilisables par l'ensemble des fichiers de l'extension sous forme d'envoi de message
 */

 var localParams = [
   "tag",
   "activated"
 ];
 var distantParams = [
   "token"
 ];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      // Quand on a fait une connection sur Linkedin
      case 'connection':
      chrome.storage.local.get(['token', 'tag'], function (items) {
        var defer = $.post('https://api.getpro.co/candidates?token='+items.token, {
          tag: items.tag,
          FULL_NAME: request.parameters.fullName,
          LINKEDIN_URL: request.parameters.linkedinURL
        });
        defer.fail(function(data) {
          alert('Error while trying to send the new candidate, maybe you don\'t have the right token ?s');
          console.log(data);
        });
      });
        break;

      // Quand on souhaite accéder aux paramètres stockés dans le chrome.storage
      case 'getParameters':
        chrome.storage.sync.get(_.intersection(request.properties, distantParams), function(distItems) {
          chrome.storage.local.get(_.intersection(request.properties, localParams), function (localItems) {
            var items = _.extend(localItems, distItems);
            $.each(request.properties, function (index, value) {
              // Gestion des valeurs par défaut
              if (typeof items[value] == "undefined") {
                switch (value) {
                  case "tag":
                  case "token":
                    items[value] = "";
                    break;
                  case "activated":
                    items[value] = false;
                    break;
                  default:

                }
              }
            });
            sendResponse(items);
          });
        });

        return true;

      // Quand on souhaite modifier ces paramètres
      case 'setParameters':
        chrome.storage.sync.set(_.pick(request.parameters, distantParams), function() {
          chrome.storage.local.set(_.pick(request.parameters, localParams), function() {
            sendResponse(true);
          });
        });
        return true;
      default:
        alert('Unknown message type');
    }

    return true;
});
