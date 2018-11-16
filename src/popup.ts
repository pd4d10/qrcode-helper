import qrcode from 'qrcode-generator'

function main() {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')

  if (!code) return

  // reset style
  document.documentElement!.style.height = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'

  const qr = qrcode(4, 'L')
  qr.addData(code)
  qr.make()
  document.body.innerHTML = qr.createSvgTag()
  const svg = document.querySelector('svg')!
  svg.style.width = '100%'
  svg.style.height = '100%'
}

main()
