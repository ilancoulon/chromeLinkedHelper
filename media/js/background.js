chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      case 'connection':
      chrome.storage.local.get(['token', 'tag'], function (items) {
        var defer = $.post('https://api.getpro.co/candidates?token'+items.token, {
          tag: items.tag,
          id: request.candidateId
        });
        defer.fail(function(data) {
          alert('Error while trying to send the new candidate');
          console.log(data);
        });
      });
        break;
      case 'parameters':
        chrome.storage.local.get(request.properties, function (items) {
          sendResponse(items);
        });
        return true;
      default:
        alert('Unknown message type');
    }

    return true;
});
