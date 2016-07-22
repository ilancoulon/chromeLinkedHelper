chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      case 'connection':
      chrome.storage.local.get(['token', 'tag'], function (items) {
        var defer = $.post('https://api.getpro.co/candidates?token='+items.token, {
          tag: items.tag,
          id: request.candidateId
        });
        defer.fail(function(data) {
          alert('Error while trying to send the new candidate, maybe you don\'t have the right token ?s');
          console.log(data);
        });
      });
        break;
      case 'parameters':
        chrome.storage.local.get(request.properties, function (items) {
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
        return true;
      default:
        alert('Unknown message type');
    }

    return true;
});
