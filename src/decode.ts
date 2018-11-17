import jsqr from 'jsqr'

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => {
      // const { width, height } = image
      // resolve({ width, height })
      resolve(image)
    })
    image.addEventListener('error', reject)
    image.src = url
    // document.body.append(image)
  })
}

async function main() {
  const params = new URLSearchParams(location.search)
  const url = params.get('url')

  if (!url) return
  console.log(url)

  // const res = await fetch(url)
  // const buffer = await res.arrayBuffer()
  const img = await loadImage(url)
  // const reader = new FileReader()
  // reader.readAsDataURL(new Blob([buffer]))

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const context = canvas.getContext('2d')!
  context.drawImage(img, 0, 0)
  const imageData = context.getImageData(0, 0, img.width, img.height)

  const result = jsqr(imageData.data, img.width, img.height)
  if (result) {
    document.write(result.data)
  }
}

main()
