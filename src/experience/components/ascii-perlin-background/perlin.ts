// A fixed permutation keeps the gradient field stable between frames.
const permutation = (() => {
  const values = Array.from({ length: 256 }, (_, index) => index)
  let seed = 123456789
  for (let i = values.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    const j = seed % (i + 1)
    ;[values[i], values[j]] = [values[j], values[i]]
  }
  return [...values, ...values]
})()

const fade = (value: number) => value * value * value * (value * (value * 6 - 15) + 10)
const lerp = (a: number, b: number, amount: number) => a + amount * (b - a)

function gradient(hash: number, x: number, y: number, z: number) {
  const h = hash & 15
  const u = h < 8 ? x : y
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z
  return (h & 1 ? -u : u) + (h & 2 ? -v : v)
}

// Improved gradient noise, following Ken Perlin's 2002 reference algorithm.
export function perlin3D(x: number, y: number, z: number) {
  const ix = Math.floor(x) & 255
  const iy = Math.floor(y) & 255
  const iz = Math.floor(z) & 255
  x -= Math.floor(x)
  y -= Math.floor(y)
  z -= Math.floor(z)
  const u = fade(x), v = fade(y), w = fade(z)
  const a = permutation[ix] + iy, b = permutation[ix + 1] + iy
  const aa = permutation[a] + iz, ab = permutation[a + 1] + iz
  const ba = permutation[b] + iz, bb = permutation[b + 1] + iz
  return lerp(
    lerp(lerp(gradient(permutation[aa], x, y, z), gradient(permutation[ba], x - 1, y, z), u),
      lerp(gradient(permutation[ab], x, y - 1, z), gradient(permutation[bb], x - 1, y - 1, z), u), v),
    lerp(lerp(gradient(permutation[aa + 1], x, y, z - 1), gradient(permutation[ba + 1], x - 1, y, z - 1), u),
      lerp(gradient(permutation[ab + 1], x, y - 1, z - 1), gradient(permutation[bb + 1], x - 1, y - 1, z - 1), u), v), w,
  )
}
