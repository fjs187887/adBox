export default function getObjectValue (obj, link, split = '.') {
  if (typeof obj !== 'object') {
    return void 0
  }
  if (typeof link !== 'string' && !(link instanceof Array)) {
    return void 0
  }
  let keys = link instanceof Array ? link : link.split(split)
  if (typeof keys.filter === 'function') {
    keys.filter(v => v !== null)
  }
  if (keys.length === 1) {
    return obj[keys[0]]
  } else {
    return getObjectValue(obj[keys[0]], keys.splice(1), split)
  }
}
