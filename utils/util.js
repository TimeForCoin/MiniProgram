const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const as = function (fn, params) {
  return new Promise((resolve, reject) => {
    const p = {
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    }
    Object.assign(p, params)
    fn(p)
  })
}

module.exports = {
  formatTime: formatTime,
  as: as
}
