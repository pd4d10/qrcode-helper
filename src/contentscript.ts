console.log('qrcode')

const DOM_ID = 'qrcode_qrcode'

function showDialog() {
  if (!document.getElementById(DOM_ID)) {
    const $dialog = document.createElement('dialog')
    $dialog.id = DOM_ID
    document.body.appendChild($dialog)

    // Click backdrop to close dialog
    // https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
    $dialog.addEventListener('click', function (event) {
      var rect = $dialog.getBoundingClientRect();
      var isInDialog = rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isInDialog) {
        $dialog.close()
      }
    });
  }

  document.getElementById(DOM_ID).showModal()
}

function hideDialog() {
  try {
    document.getElementById(DOM_ID).close()
  } catch (err) {
    // If no element found, do nothing
  }
}

chrome.runtime.onMessage.addListener(message => {
  console.log(message)

  switch (message.type) {
    case 'generate': {
      if (typeof message.info.selectionText === 'string') {
        // https://github.com/kazuhikoarase/qrcode-generator/blob/master/js/sample.js
        var qr = qrcodeGenerator(4, 'M');
        qr.addData(message.info.selectionText);
        qr.make();

        showDialog()
        document.getElementById(DOM_ID).innerHTML = qr.createImgTag()
      }
      break
    }
    case 'read': {
      alert(message.text)
      break
    }
    default:
      break
  }
})
