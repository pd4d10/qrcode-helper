import qrcode from 'qrcode-generator'

function main() {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  console.log(code)

  if (!code) return

  // reset style
  document.documentElement!.style.height = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'

  try {
    const qr = qrcode(0, 'M')
    qr.addData(code)
    qr.make()
    document.body.innerHTML = qr.createSvgTag()
    const svg = document.querySelector('svg')!
    svg.style.width = '100%'
    svg.style.height = '100%'
  } catch (err) {
    console.error(err)
    alert(chrome.i18n.getMessage('generateFail') + err)
    window.close()
  }
}

main()
