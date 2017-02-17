'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.contextMenus.create({
  title: chrome.i18n.getMessage('generate'),
  contexts: ['page', 'selection', 'link'],
  onclick(info, tab) {
    console.log(info)

    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { info })
    })
  }
});
