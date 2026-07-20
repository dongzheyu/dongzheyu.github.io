export function useNoiseOverlay() {
  if (typeof document === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.style.cssText = `
    position: fixed; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 9999;
    opacity: 0.04; mix-blend-mode: overlay;
  `
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = 256
  const h = 256
  canvas.width = w
  canvas.height = h

  const imageData = ctx.createImageData(w, h)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255
    data[i] = v
    data[i + 1] = v
    data[i + 2] = v
    data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0)

  document.body.appendChild(canvas)
}