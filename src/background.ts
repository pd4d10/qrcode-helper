function openCodePopup(text: string) {
  chrome.windows.create({
    url: chrome.extension.getURL(
      'dist/popup.html?code=' + encodeURIComponent(text),
    ),
    type: 'panel',
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

// Read QRCode
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('read'),
  contexts: ['image'],
  onclick(info) {
    // Send decode text to content script
    qrcode.callback = text => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'read',
            text,
          })
        },
      )
    }

    qrcode.decode(info.srcUrl)
  },
})
