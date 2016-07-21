chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.get(request.properties, function (items) {
      sendResponse(items);
    });
    return true;
});
