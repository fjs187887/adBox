export default (...args) => sum(...args)
export function sum (toNumber, n1, n2, ...others) {
  let length = arguments.length
  if (typeof toNumber !== 'function') {
    others.splice(0, 0, n2)
    n2 = n1
    n1 = toNumber
    toNumber = n => isNaN(n) ? 0 : Number(n)
  } else length -= 1
  switch (length) {
    case 0: return 0
    case 1: return toNumber(n1)
    case 2: return toNumber(n1) + toNumber(n2)
    default: return sum(sum(toNumber, n1, n2), ...others)
  }
}
