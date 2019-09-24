const crypto = require('crypto')

module.exports = (str) => {
  let MD5Hash = crypto.createHash('md5')
  MD5Hash.update(str || '')
  return MD5Hash.digest('hex')
}
