console.log('qrcode')

// import QRCode from '../bower_components/qrcode.js/lib/qrcode'

const DOM_ID = 'qrcode'

const $container = document.createElement('div')
$container.style.position = 'fixed'
$container.style.left = '50%'
$container.style.top = '50%'
$container.id = DOM_ID
document.body.appendChild($container)

chrome.runtime.onMessage.addListener(message => {
  console.log(message)

  const { info } = message
  if (typeof info.selectionText === 'string') {
    console.log(info)
    // require('../lib/qrcode', qrcode => {
      // new window.QRCode(DOM_ID, info.selectionText)
    // })

    // https://github.com/kazuhikoarase/qrcode-generator/blob/master/js/sample.js
    var qr = qrcode(4, 'M');
    qr.addData(info.selectionText);
    qr.make();

    $container.innerHTML = qr.createImgTag()
  }
})
