const ROOT = 'https://coin.zhenly.cn/api/'
// const ROOT = 'http://127.0.0.1:30233/'
let sessionId = ""

module.exports = {
  request: (method, url, data) => {
    return new Promise((resolve, reject) => {
      if (sessionId == "") {
        sessionId = wx.getStorageSync("sessionId")
      }

      wx.request({
        method: method,
        url: ROOT + url,
        header: {
          cookie: "time-for-coin=" + sessionId
        },
        data: data,
        success: res => {
          if (res.cookies && res.cookies.length > 0) {
            sessionId = res.cookies[0].match(/time-for-coin=(\S*);/)[1]
            wx.setStorageSync("sessionId", sessionId)
          }
          if (res.header['Set-Cookie'] && res.header['Set-Cookie'] !== "") {
            sessionId = res.header['Set-Cookie'].match(/time-for-coin=(\S*);/)[1]
            wx.setStorageSync("sessionId", sessionId)
          }
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  uploadFile: (filePath, type) => {
    return new Promise((resolve, reject) => {
      if (sessionId == "") {
        sessionId = wx.getStorageSync("sessionId")
      }
      wx.uploadFile({
        url: ROOT + 'file',
        filePath: filePath,
        name: 'data',
        header: {
          cookie: "time-for-coin=" + sessionId
        },
        formData: {
          type: type,
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })

    })
  }
}
