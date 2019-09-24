export default function deepEach (list, callback) {
  for (let i = 0; i < list.length; i++) {
    let _break
    let result = callback(list[i], () => (_break = true), i)
    if (result instanceof Array) deepEach(result, callback)
    if (_break) break
  }
}
