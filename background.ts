function openCodePopup(text: string) {
  chrome.windows.create({
    url: chrome.runtime.getURL(
      "tabs/popup.html?code=" + encodeURIComponent(text)
    ),
    type: "popup",
    width: 480,
    height: 480,
    // state: 'docked',
  });
}

// generate current url
chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  if (tab.url) {
    openCodePopup(tab.url);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  // generate from selection
  chrome.contextMenus.create({
    id: "generate",
    title: chrome.i18n.getMessage("generate"),
    contexts: ["selection"],
  });

  // read from image
  chrome.contextMenus.create({
    id: "read",
    title: chrome.i18n.getMessage("read"),
    contexts: ["image"],
  });
});

// make context menu works with non-persistent background
// https://stackoverflow.com/a/26246735
chrome.contextMenus.onClicked.addListener((info) => {
  console.log(info);

  switch (info.menuItemId) {
    case "generate":
      if (info.selectionText) {
        openCodePopup(info.selectionText);
      }
    case "read":
      if (info.srcUrl) {
        chrome.windows.create({
          url: chrome.runtime.getURL(
            "tabs/decode.html?url=" + encodeURIComponent(info.srcUrl)
          ),
          type: "popup",
          width: 480,
          height: 480,
        });
      }
  }
});
