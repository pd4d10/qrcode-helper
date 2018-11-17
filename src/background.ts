function openCodePopup(text: string) {
  chrome.windows.create({
    url: chrome.extension.getURL(
      'dist/popup.html?code=' + encodeURIComponent(text),
    ),
    type: 'popup',
    width: 480,
    height: 480,
    // state: 'docked',
  })
}

// generate current url
chrome.browserAction.onClicked.addListener(tab => {
  console.log(tab)
  if (tab.url) {
    openCodePopup(tab.url)
  }
})

// generate from selection
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('generate'),
  contexts: ['selection'],
  onclick(info) {
    console.log(info)
    if (info.selectionText) {
      openCodePopup(info.selectionText)
    }
  },
})

// read from image
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('read'),
  contexts: ['image'],
  onclick(info) {
    console.log(info)
    if (info.srcUrl) {
      chrome.windows.create({
        url: chrome.extension.getURL(
          'dist/decode.html?url=' + encodeURIComponent(info.srcUrl),
        ),
        type: 'popup',
        width: 480,
        height: 480,
      })
    }
  },
})
