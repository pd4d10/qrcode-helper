'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

console.log('\'Allo \'Allo! Event Page for Browser Action');

// Generate QRCode
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('generate'),
  contexts: ['selection'],
  onclick(info, tab) {
    console.log(info)

    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'generate',
        info,
      })
    })
  }
});

// Read QRCode
chrome.contextMenus.create({
  title: chrome.i18n.getMessage('read'),
  contexts: ['image'],
  onclick(info, tab) {
    // Send decode text to content script
    qrcode.callback = text => {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'read',
          text,
        })
      })
    }

    qrcode.decode(info.srcUrl)
  }
})