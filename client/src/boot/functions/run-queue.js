function Queue (fn) {
  let _this = this, list = [], runing = false
  let get = () => {
    runing = list.splice(0, 1)[0]
    return runing
  }
  this.next = () => {
    get() && setTimeout(() => fn.apply(this, runing), 0)
  }
  this.list = () => {
    return list
  }

  function push () {
    list.push(arguments);
    (!runing) && _this.next()
  }
  push.next = () => this.next()
  return push
}
module.exports = (fn) => {
  return new Queue(fn)
}
